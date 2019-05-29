import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {BeeHive, SerializedBeeHive} from '../../../../../src/app/common/models/beehive.model';
import {BeeKeeper} from '../../../../../src/app/common/models/beekeeper.model';
import {ConfigurationException} from '../exceptions/configuration.exception';
import {HiveClaim} from '../models/hiveClaim.model';
import {sha256} from 'js-sha256';
import {ClaimException} from '../../claim/exceptions/claim.exception';
import {ClaimExceptionType} from '../../claim/exceptions/claim-status.enum';


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
  private static generateClaimToken(forHive: BeeHive, forKeeper: BeeKeeper): string {

    if (!functions.config().hash || !functions.config().hash.secret_sauce) {
      throw new ConfigurationException('No Secret Sauce configured, cannot generate secure hash. ' +
        'Please make sure you configure the app with ' +
        '$ firebase functions:config:set hash.secretSauce="my secret sauce"!');
    }

    const secretSauce = functions.config().hash.secret_sauce;

    return sha256.hex(secretSauce + forHive.id + forKeeper.id);
  }

  /**
   * Updates an existing claim with a new Keeper id and a new token.
   *
   * @param claim Existing HiveClaiam
   * @param token Token to use for claim
   * @param forHive Hive for which to update claim
   * @param forKeeper Keeper for which to update claim
   */
  private static updateClaim(claim: HiveClaim, token: string, forHive: BeeHive, forKeeper: BeeKeeper): Promise<HiveClaim> {

    return new Promise((succ, err) => {

      const id = claim.id;

      claim.hiveUid = forHive.id;
      claim.keeperUid = forKeeper.id;
      claim.token = token;

      const serialized = {...claim};
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

  /**
   * Creates a new claim for a given BeeHive and a given BeeKeeper.
   *
   * @param token Token to use for claim
   * @param forHive Hive for which to create claim
   * @param forKeeper Keeper for which to create claim
   */
  private static createClaim(token: string, forHive: BeeHive, forKeeper: BeeKeeper): Promise<HiveClaim> {

    return new Promise((succ, err) => {
      const now = new Date();

      const claim = {
        created: now,
        updated: now,
        claimed: false,
        hiveUid: forHive.id,
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
  private static getClaimForHiveIfExists(forHive: BeeHive): Promise<HiveClaim | null> {

    return new Promise((succ, err) => {
      admin.firestore().collection('beehiveClaim')
        .where('hiveUid', '==', forHive.id)
        .get()
        .then(snapshots => {
          if (snapshots.docs.length > 1) {
            err('Encountered more than one claim for hive ' + forHive.id + ', cannot continue.');
          }

          if (snapshots.docs.length === 1) {
            snapshots.forEach(snapshot => {
              succ({
                id: snapshot.id,
                ...snapshot.data()
              } as HiveClaim);
            });
          } else {
            succ(null);
          }
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
   * @param token Token for which to find claim
   */
  private static getClaimForTokenIfExists(token: string): Promise<HiveClaim | null> {

    return new Promise((succ, err) => {
      admin.firestore().collection('beehiveClaim')
        .where('token', '==', token)
        .get()
        .then(snapshots => {
          if (snapshots.docs.length > 1) {
            err('Encountered more than one claim for hive with token ' + token + ', cannot continue.');
          }

          if (snapshots.docs.length === 1) {
            snapshots.forEach(snapshot => {
              succ({
                id: snapshot.id,
                ...snapshot.data()
              } as HiveClaim);
            });
          } else {
            succ(null);
          }
        })
        .catch(error => {
          err(error);
        });
    });
  }

  /**
   * Creates or updates a HiveClaim for a given BeeHive and a given BeeKeeper.
   *
   * @param forHive Hive for which to create or update claim
   * @param forKeeper Keeper for which to create or update claim
   */
  public static createOrUpdateClaim(forHive: BeeHive, forKeeper: BeeKeeper): Promise<HiveClaim> {

    return new Promise((succ, err) => {

      let token = '';

      try {
        token = HiveManager.generateClaimToken(forHive, forKeeper);
      } catch (e) {
        err(e);
        return;
      }

      HiveManager.getClaimForHiveIfExists(forHive).then(hiveClaim => {
        if (hiveClaim) {
          HiveManager.updateClaim(hiveClaim, token, forHive, forKeeper)
            .then(updatedClaim => {
              succ(updatedClaim);
            })
            .catch(updateError => {
              err(updateError);
            });
        } else {
          this.createClaim(token, forHive, forKeeper)
            .then(createdClaim => {
              succ(createdClaim);
            })
            .catch(createError => {
              err(createError);
            });
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

            void admin.firestore().collection('beehive').doc(claim.hiveUid).set({
              assignedBeekeeperUID: claim.keeperUid
            });

            void admin.firestore().collection('beehiveClaim').doc(claim.id).set({
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
  public static async declineHive(token: string): Promise<BeeHive> {

    return new Promise<BeeHive>((succ, err) => {

      HiveManager.getClaimForTokenIfExists(token)
        .then(claim => {
          if (claim) {

            void admin.firestore().collection('beehive').doc(claim.hiveUid).get()
              .then(hiveData => {

                const hive: BeeHive = new BeeHive({
                  id: hiveData.id,
                  ...hiveData.data()
                } as SerializedBeeHive);

                hive.declineBeekeeperUID(claim.keeperUid);
                void admin.firestore().collection('beehive').doc(claim.hiveUid).set(
                  hive.deflate()
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
