import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Hive, HiveModel } from '../../../../../src/app/common/models/hive';
import { BeeKeeper } from '../../../../../src/app/common/models/beekeeper.model';
import { ClaimExceptionType } from '../../claim/exceptions/claim-status.enum';
import { ClaimException } from '../../claim/exceptions/claim.exception';
import { ConfigurationException } from '../exceptions/configuration.exception';
import { HiveClaim } from '../models/hiveClaim.model';
import { sha256 } from 'js-sha256';
import * as firebase from 'firebase';


/**
 * Manages incoming claim/decline requests.
 * If a beehive is claimed, it will be updated with the BeeKeepers id.
 * If a beehive is declined, the next BeeKeeper will be notified and offered the beehive.
 */
export class HiveManager {

  /**
   * Generates a sha256 hash using a secret, a beehive id and a beekeeper id.
   *
   * @param forHive Hive of which to use id for hash
   * @param forKeeper Beekeeper of which to use id for hash
   */
  private static generateClaimToken(forHive: HiveModel, forKeeper: BeeKeeper): string {

    if (!functions.config().hash || !functions.config().hash.secret_sauce) {
      throw new ConfigurationException('No Secret Sauce configured, cannot generate secure hash. ' +
        'Please make sure you configure the app with ' +
        '$ firebase functions:config:set hash.secretSauce="my secret sauce"!');
    }

    const secretSauce = functions.config().hash.secret_sauce;
    return sha256.hex(secretSauce + forHive.uid + forKeeper.id);
  }

  /**
   * Updates an existing claim with a new Keeper id and a new token.
   *
   * @param claim Existing HiveClaiam
   * @param token Token to use for claim
   * @param forHive Hive for which to update claim
   * @param forKeeper Keeper for which to update claim
   */
  private static updateClaim(claim: HiveClaim, token: string, forHive: HiveModel, forKeeper: BeeKeeper): Promise<HiveClaim> {

    return new Promise((succ, err) => {

      const id = claim.id;

      claim.hiveUid = forHive.uid;
      claim.keeperUid = forKeeper.id;
      claim.token = token;

      const serialized = { ...claim };
      delete serialized.id;

      admin.firestore().collection('beehiveClaim')
        .doc(id)
        .set({
          ...serialized
        })
        .then(() => {
          succ(claim);
        })
        .catch(error => {
          err(error);
        });
    });
  }

  private static async getSingleHiveClaimForFilter(attr: string, op: firebase.firestore.WhereFilterOp, value: string | number) {

    return new Promise<HiveClaim>((succ, err) => {
      void admin.firestore().collection('beehiveClaim')
        .where(attr, op, value)
        .get()
        .then(snapshots => {
          if (snapshots.docs.length > 1) {
            err('Encountered more than one hive claim for filter query, cannot continue.');
          }

          if (snapshots.docs.length === 1) {
            succ({
              id: snapshots.docs[0].id,
              ...snapshots.docs[0].data()
            } as HiveClaim);
          } else {
            succ(undefined);
          }
        });
    });
  }

  /**
   * Creates a new claim for a given BeeHive and a given BeeKeeper.
   *
   * @param token Token to use for claim
   * @param forHive Hive for which to create claim
   * @param forKeeper Keeper for which to create claim
   */
  private static createClaim(token: string, forHive: HiveModel, forKeeper: BeeKeeper): Promise<HiveClaim> {

    return new Promise((succ, err) => {
      const now = new Date();

      const claim = {
        created: now,
        updated: now,
        claimed: false,
        hiveUid: forHive.uid,
        keeperUid: forKeeper.id,
        token
      } as HiveClaim;

      admin.firestore().collection('beehiveClaim').add({
        ...claim
      })
        .then(() => {
          succ(claim);
        })
        .catch(error => {
          err(error);
        });
    });
  }

  /**
   * Checks if a HiveClaim for a given BeeHive already exists and returns it if this is the case.
   * Returns null if not Claim exists.
   *
   * @param forHive BeeHive for which to find an existing Claim
   */
  private static getClaimForHiveIfExists(forHive: HiveModel): Promise<HiveClaim> {
    return HiveManager.getSingleHiveClaimForFilter('hiveUid', '==', forHive.uid);
  }

  /**
   * Checks if a HiveClaim for a given BeeHive already exists and returns it if this is the case.
   * Returns null if not Claim exists.
   *
   * @param token Token for which to find claim
   */
  private static getClaimForTokenIfExists(token: string): Promise<HiveClaim | null> {
    return HiveManager.getSingleHiveClaimForFilter('token', '==', token);
  }

  /**
   * Creates or updates a HiveClaim for a given BeeHive and a given BeeKeeper.
   *
   * @param forHive Hive for which to create or update claim
   * @param forKeeper Keeper for which to create or update claim
   */
  public static createOrUpdateClaim(forHive: HiveModel, forKeeper: BeeKeeper): Promise<HiveClaim> {
    return new Promise((succ, err) => {

      let token = '';

      try {
        token = HiveManager.generateClaimToken(forHive, forKeeper);
      } catch (e) {
        err(e);
        return;
      }

      HiveManager.getClaimForHiveIfExists(forHive).then(async hiveClaim => {
        try {
          if (hiveClaim) {
            succ(await HiveManager.updateClaim(hiveClaim, token, forHive, forKeeper));
          } else {
            succ(await HiveManager.createClaim(token, forHive, forKeeper));
          }
        } catch (e) {
          err(e);
        }
      }).catch(error => {
        err(error);
      });
    });
  }

  /**
   * Assigns a given beehive to the BeeKeeper
   * @param token Token of claim to the hive
   */
  public static claimHive(token: string): Promise<void> {

    return new Promise<void>((succ, err) => {
      HiveManager.getClaimForTokenIfExists(token)
        .then(claim => {
          if (claim) {

            if (claim.claimed) {
              err(new ClaimException(ClaimExceptionType.ALREADY_CLAIMED));
              return;
            }

            claim.claimed = true;
            claim.updated = new Date();

            void admin.firestore().collection('beehive').doc(claim.hiveUid).update({
              assignedBeekeeperUID: claim.keeperUid
            });

            void admin.firestore().collection('beehiveClaim').doc(claim.id).update({
              ...claim
            });

            succ();

          } else {
            err(new ClaimException(ClaimExceptionType.INVALID_CLAIM_TOKEN));
          }
        })
        .catch(error => {
          throw error;
        });
    });
  }

  /**
   * Notifies the next BeeKeeper in line.
   * @param token Token of claim to the hive
   */
  public static async declineHive(token: string): Promise<HiveModel> {

    return new Promise<HiveModel>((succ, err) => {

      HiveManager.getClaimForTokenIfExists(token).then(claim => {
        if (claim) {
          void admin.firestore().collection('beehive').doc(claim.hiveUid).get().then(hiveData => {

            const hive = new Hive({
              uid: hiveData.id,
              ...hiveData.data()
            } as HiveModel);
            hive.decline(claim.keeperUid);
            void admin.firestore().collection('beehive').doc(claim.hiveUid).update(
              hive
            );

            succ(hive);

          });

        } else {
          err(new ClaimException(ClaimExceptionType.INVALID_CLAIM_TOKEN));
        }
      })
        .catch(error => {
          throw error;
        });
    });
  }
}
