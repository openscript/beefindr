import {Hive, HiveModel} from '../../../../../src/app/common/models/hive';
import {Location} from '../../../../../src/app/common/models/location';
import {KeeperModel} from '../../../../../src/app/common/models/keeper';


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
   * @param hive BeeHive for which to find the closests available BeeKeeper
   */
  public static selectClosestToHive(keepers: KeeperModel[], hiveModel: HiveModel): KeeperModel | null {
    const hive = new Hive(hiveModel);
    let closestKeeper: KeeperModel | null = null;
    let smallestDistance = -1;

    for (const beekeeper of keepers.filter(k => !hive.wasDeclinedBy(k.uid))) {
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
