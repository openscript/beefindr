import * as admin from "firebase-admin";
import {BeeHive} from "../../../src/app/common/models/beehive.model";
import {BeekeeperService} from "../../../src/app/common/services/beekeeper.service";
import {BeeKeeper} from "../../../src/app/common/models/beekeeper.model";
import {Dispatcher} from "./dispatcher.interface";


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
  private sendMessage(subject: string, body: string, recipient: BeeKeeper) {
    for (const dispatcher of this.dispatchers) {
      dispatcher.dispatchMessage(subject, body, recipient);
    }
  }

  /**
   * Uses a BeekeeperService to find the closest BeeKeeper to a given BeeHive and
   * notifies them about the hive.
   *
   * @param aboutHive BeeHive Beekeepers should be notified about
   */
  public notifyClosestBeekeeper(aboutHive: BeeHive) {

    const beekeeperService: BeekeeperService = new BeekeeperService(admin.firestore());
    beekeeperService.getClosestToHive(aboutHive).then(closestBeekeeper => {

      // Beekeeper available, notify via message
      // TODO: i18n
      this.sendMessage(
        'Neuer Bienenschwarm gefunden!',
        'Es wurde ein neuer Bienenschwarm in deiner Nähe gemeldet. Klicke hier, um ihn anzuschauen und zu beanspruchen.',
        closestBeekeeper);
      return true;

    }).catch(err => {
      console.warn('No Beekeepers available for Hive ' + aboutHive.id);
      return false;
    });
  }
}
