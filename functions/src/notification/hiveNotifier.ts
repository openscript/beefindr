import * as admin from "firebase-admin";
import {BeeHive} from "../../../src/app/common/models/beehive.model";
import {BeekeeperService} from "../../../src/app/common/services/beekeeper.service";
import {BeeKeeper} from "../../../src/app/common/models/beekeeper.model";
import {Dispatcher} from "./dispatchers/dispatcher.interface";
import {environment} from "../../../src/environments/environment";


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
   * Sends a message via all Dispatchers the notifier was instantiated with.
   *
   * @param subject Subject of the message
   * @param body Text content of the message
   * @param recipient Recipient (currently only BeeKeepers), could be replaced with a more general interface (e.g. «User», ...)
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

    const beekeeperService: BeekeeperService = new BeekeeperService(admin.firestore());
    beekeeperService.getClosestToHive(hive).then(closestBeekeeper => {

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
