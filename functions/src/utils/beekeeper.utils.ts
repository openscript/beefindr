import {BeeKeeper} from "../../../src/app/common/models/beekeeper.model";
import {BeeHive} from "../../../src/app/common/models/beehive.model";

export class BeekeeperUtils {


  /**
   * Evaluates the BeeKeeper closest to a given BeeHive.
   * Only considers BeeKeepers that haven't previously declined the hive.
   *
   * Note: This is implemented quick & dirty as no knowledge about
   * geospatial filtering on Firestore is available or known at this point.
   * Feel free to improve.
   *
   * @param keepers
   * @param hive BeeHive for which to find the closests available BeeKeeper
   */
  public static selectClosestToHive(keepers: BeeKeeper[], hive: BeeHive): BeeKeeper | null {

    let closestKeeper: BeeKeeper | null = null;
    let smallestDistance = -1;

    for (const beekeeper of keepers) {

      if (hive.wasDeclinedByKeeper(beekeeper)) {
        continue;
      }

      const distance = beekeeper.getLocation().distanceTo(hive.getLocation());

      if (smallestDistance < 0 || distance < smallestDistance) {
        closestKeeper = beekeeper;
        smallestDistance = distance;
      }
    }

    return closestKeeper;
  }
}
