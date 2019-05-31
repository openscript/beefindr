import {Hive, HiveModel} from '../../../../../src/app/common/models/hive';
import {Location} from '../../../../../src/app/common/models/location';
import {PersistedKeeperModel} from '../../beehive/models/persisted-keeper.model';


export class BeekeeperUtils {

  /**
   * Evaluates the BeeKeeper closest to a given BeeHive.
   * Only considers BeeKeepers that haven't previously declined the hive.
   *
   * Note: This is implemented quick & dirty as no knowledge about
   * geospatial filtering on Firestore is available or known at this point.
   * Feel free to improve.
   *
   * @param keepers A list of BeeKeepers from which to select closest to hive
   * @param hiveModel Hive for which to select closest keeper (if any) in a given list of keepers
   */
  public static selectClosestToHive(keepers: PersistedKeeperModel[], hiveModel: HiveModel): PersistedKeeperModel | null {
    const hive = new Hive(hiveModel);
    let closestKeeper: PersistedKeeperModel | null = null;
    let smallestDistance = -1;

    for (const beekeeper of keepers.filter(k => k.uid && !hive.wasDeclinedBy(k.uid))) {
      const keeperLocation = new Location(beekeeper.location);
      const distance = keeperLocation.distanceTo(hive.location);

      if (smallestDistance < 0 || distance < smallestDistance) {
        closestKeeper = beekeeper;
        smallestDistance = distance;
      }
    }

    return closestKeeper;
  }
}
