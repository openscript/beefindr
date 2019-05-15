import {AbstractFirestoreOrmService} from './abstract-firestore-orm.service';
import {BeeHive} from '../models/beehive.model';
import {BeeKeeper, SerializedBeeKeeper} from '../models/beekeeper.model';


export class BeekeeperService extends AbstractFirestoreOrmService<BeeKeeper, SerializedBeeKeeper> {


  public getCollectionName(): string {
    return 'beekeeper';
  }

  public getModelClass() {
    return BeeKeeper;
  }

  /**
   * Evaluates the BeeKeeper closest to a given BeeHive.
   * Only considers BeeKeepers that haven't previously declined the hive.
   *
   * Note: This is implemented quick & dirty as no knowledge about
   * geospatial filtering on Firestore is available or known at this point.
   * Feel free to improve.
   *
   * @param hive BeeHive for which to find the closests available BeeKeeper
   */
  public getClosestToHive(hive: BeeHive): Promise<BeeKeeper> {

    let closestKeeper: BeeKeeper;
    let smallestDistance = -1;

    return new Promise<BeeKeeper>((succ, err) => {

      return this.listItemsStatic().then(
        keepers => {

          for (const keeper of keepers.filter(k => !hive.wasDeclinedByKeeper(k))) {

            const distance = keeper.getLocation().distanceTo(hive.getLocation());

            if (smallestDistance < 0 || distance < smallestDistance) {
              closestKeeper = keeper;
              smallestDistance = distance;
            }
          }

          if (closestKeeper) {
            succ(closestKeeper);
          } else {
            err(false);
          }
        }
      );
    });
  }
}
