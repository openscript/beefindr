import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
import {ClaimExceptionType} from '../../claim/exceptions/claim-status.enum';
import {ClaimException} from '../../claim/exceptions/claim.exception';
import {ConfigurationException} from '../exceptions/configuration.exception';
import {Hive, HiveModel} from '../../../../../src/app/common/models/hive';
import {HiveClaim} from '../models/hiveClaim.model';
import {PersistedHiveModel} from '../models/persisted-hive.model';
import {PersistedKeeperModel} from '../models/persisted-keeper.model';
import {sha256} from 'js-sha256';


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
  private static generateClaimToken(forHive: HiveModel, forKeeper: PersistedKeeperModel): string {

    if (!functions.config().hash || !functions.config().hash.secret_sauce) {
      throw new ConfigurationException('No Secret Sauce configured, cannot generate secure hash. ' +
        'Please make sure you configure the app with ' +
        '$ firebase functions:config:set hash.secret_sauce="my secret sauce"!');
    }

    const secretSauce = functions.config().hash.secret_sauce;
    return sha256.hex(secretSauce + forHive.uid + forKeeper.uid);
  }

  /**
   * Checks if a HiveClaim for a given BeeHive already exists and returns it if this is the case.
   * Returns null if not Claim exists.
   *
   * @param forHive BeeHive for which to find an existing Claim
   */
  private static getClaimForHiveIfExists(forHive: PersistedHiveModel): Promise<HiveClaim> {
    return HiveManager.getSingleClaimForFilter('hiveUid', '==', forHive.uid);
  }

  /**
   * Creates or updates a HiveClaim for a given BeeHive and a given BeeKeeper.
   *
   * @param forHive Hive for which to create or update claim
   * @param forKeeper Keeper for which to create or update claim
   */
  public static async getOrCreateClaim(forHive: PersistedHiveModel, forKeeper: PersistedKeeperModel): Promise<HiveClaim> {

    let claim: HiveClaim = await HiveManager.getClaimForHiveIfExists(forHive);
    if (!claim) {
      const now = new Date();

      claim = {
        created: now,
        updated: now,
        claimed: false,
        hiveUid: forHive.uid,
        keeperUid: forKeeper.uid
      } as HiveClaim;
    }

    claim.keeperUid = forKeeper.uid;

    return claim;
  }


  private static async getSingleClaimForFilter(attr: string, op: firebase.firestore.WhereFilterOp, value: string | number) {

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
   * Creates or updates a claim token on a given hive for
   * a given keeper.
   *
   * @param forHive Hive on which to create claim
   * @param forKeeper Keeper for which to create claim
   */
  public static async updateClaim(forHive: PersistedHiveModel, forKeeper: PersistedKeeperModel): Promise<HiveClaim> {

    const claim: HiveClaim = await this.getOrCreateClaim(forHive, forKeeper);
    claim.token = HiveManager.generateClaimToken(forHive, forKeeper);
    claim.updated = new Date();

    if (!claim.id) {
      void admin.firestore().collection('beehiveClaim').add({...claim});
    } else {
      await admin.firestore().collection('beehiveClaim')
        .doc(claim.id)
        .update({
          ...claim
        });
    }

    return claim;
  }


  /**
   * Checks if a HiveClaim for a given BeeHive already exists and returns it if this is the case.
   * Returns null if not Claim exists.
   *
   * @param token Token for which to find claim
   */
  private static getClaimForTokenIfExists(token: string): Promise<HiveClaim | null> {
    return HiveManager.getSingleClaimForFilter('token', '==', token);
  }


  /**
   * Assigns a given Hive to the entitled Keeper.
   *
   * @param token Claim Token for a given Hive
   */
  public static async claimHive(token: string) {

    let claim: HiveClaim | null;

    try {
      claim = await HiveManager.getClaimForTokenIfExists(token);
    } catch {
      throw new ClaimException(ClaimExceptionType.INVALID_CLAIM_TOKEN);
    }

    if (claim) {

      if (claim.claimed) {
        throw new ClaimException(ClaimExceptionType.ALREADY_CLAIMED);
      }

      claim.claimed = true;
      claim.updated = new Date();

      void admin.firestore().collection('beehive').doc(claim.hiveUid).update({
        assignedBeekeeperUID: claim.keeperUid
      });

      void admin.firestore().collection('beehiveClaim').doc(claim.id).update({
        claimed: claim.claimed,
        updated: claim.updated
      });

    } else {
      throw new ClaimException(ClaimExceptionType.INVALID_CLAIM_TOKEN);
    }
  }

  /**
   * Removes the currently entitled Keeper from the selection of possible
   * Keepers for a given Hive.
   *
   * @param token Claim Token for a given Hive
   */
  public static async declineHive(token: string): Promise<PersistedHiveModel> {

    let claim: HiveClaim | null;

    try {
      claim = await HiveManager.getClaimForTokenIfExists(token);
    } catch {
      throw new ClaimException(ClaimExceptionType.INVALID_CLAIM_TOKEN);
    }

    if (claim) {

      const hiveSnap = await admin.firestore().collection('beehive').doc(claim.hiveUid).get();
      const hiveModel: PersistedHiveModel = {uid: hiveSnap.id, ...hiveSnap.data()} as PersistedHiveModel;
      const hive: Hive = new Hive(hiveModel);

      hive.decline(claim.keeperUid);
      hiveModel.declinedByBeekeepers = hive.declinedByBeekeepers;

      await admin.firestore().collection('beehive').doc(claim.hiveUid).update({
        ...hive
      });

      return hiveModel;

    } else {
      throw new ClaimException(ClaimExceptionType.INVALID_CLAIM_TOKEN);
    }
  }
}
