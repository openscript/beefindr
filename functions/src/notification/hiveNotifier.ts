import {BeeHive} from "../../../src/app/common/models/beehive.model";
import {BeeKeeper, SerializedBeeKeeper} from "../../../src/app/common/models/beekeeper.model";
import {Dispatcher} from "./dispatchers/dispatcher.interface";
import {environment} from "../../../src/environments/environment";
import * as admin from "firebase-admin";


/**
 * Notifies BeeKeepers about BeeHives that are new or have been declined
 * by previous BeeKeepers. When instantiating, pass a list of Dispatchers
 * that should be used to spread the word.
 */
export class HiveNotifier {

  private readonly dispatchers: Dispatcher[];

  public constructor(dispatchers: Dispatcher[]) {
    this.dispatchers = dispatchers;
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
  private getClosestToHive(hive: BeeHive): Promise<BeeKeeper> {

    let closestKeeper: BeeKeeper;
    let smallestDistance = -1;

    return new Promise<BeeKeeper>((succ, err) => {

      admin.firestore().collection('beekeeper').get().then(
        serializedKeepers => {

          for (const serializedKeeper of serializedKeepers.docs) {

            const beekeeper = new BeeKeeper(<SerializedBeeKeeper>{id: serializedKeeper.id, ...serializedKeeper.data()});

            if (hive.wasDeclinedByKeeper(beekeeper)) {
              continue;
            }

            const distance = beekeeper.getLocation().distanceTo(hive.getLocation());

            if (smallestDistance < 0 || distance < smallestDistance) {
              closestKeeper = beekeeper;
              smallestDistance = distance;
            }
          }

          if (closestKeeper) {
            succ(closestKeeper);
          } else {
            err(false);
          }
        }
      ).catch(() => {
        console.error('Failed to get beekeeper list')
      });
    });
  }

  /**
   * Sends a message via all Dispatchers the notifier was instantiated with.
   *
   * @param subject Subject of the message
   * @param body Text content of the message
   * @param recipient Recipient (currently only BeeKeepers), could be replaced with a more general interface (e.g. «User», ...)
   * @param extraPayload Extra payload as dict for message
   */
  private sendMessage(recipient: BeeKeeper, subject: string, body: string, extraPayload: any) {
    for (const dispatcher of this.dispatchers) {
      dispatcher.dispatchMessage(recipient, subject, body, extraPayload);
    }
  }

  /**
   * Uses a BeekeeperService to find the closest BeeKeeper to a given BeeHive and
   * notifies them about the hive.
   *
   * @param hive BeeHive Beekeepers should be notified about
   */
  public notifyClosestBeekeeper(hive: BeeHive): boolean {

    console.info('Notifying closest beekeeper about Hive ' + hive.id);

    this.getClosestToHive(hive).then(closestBeekeeper => {

      // TODO: i18n
      this.sendMessage(
        closestBeekeeper,
        'Neuen Bienenschwarm gefunden!',
        'Es wurde ein neuer Bienenschwarm in deiner Nähe gemeldet. Jetzt anschauen und beanspruchen!',
        {
          link: environment.baseUrl + '/hive/' + hive.id
        }
      );

    }).catch(err => {
      console.warn('No Beekeepers available for Hive ' + hive.id);
      return false;
    });

    return true;
  }
}
