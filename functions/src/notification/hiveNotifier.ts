import * as admin from 'firebase-admin';
import {BeekeeperUtils} from '../common/beekeeper/utils/beekeeper.utils';
import {Dispatcher} from './dispatchers/dispatcher.interface';
import {environment} from '../../../src/environments/environment.prod';
import {HiveManager} from '../common/beehive/utils/HiveManager.utils';
import {HiveModel} from '../../../src/app/common/models/hive';
import {PersistedHiveModel} from '../common/beehive/models/persisted-hive.model';
import {PersistedKeeperModel} from '../common/beehive/models/persisted-keeper.model';


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

  private getClosestToHive(hive: HiveModel): Promise<PersistedKeeperModel> {

    return new Promise<PersistedKeeperModel>((succ, err) => {

      admin.firestore().collection('beekeeper').get().then(
        serializedKeepers => {

          const keepers: PersistedKeeperModel[] = [];

          for (const serializedKeeper of serializedKeepers.docs) {
            keepers.push({uid: serializedKeeper.id, ...serializedKeeper.data()} as PersistedKeeperModel);
          }

          const closest = BeekeeperUtils.selectClosestToHive(keepers, hive);

          if (closest) {
            succ(closest);
          } else {
            err(false);
          }
        }
      ).catch(() => {
        console.error('Failed to get beekeeper list');
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
  private sendMessage(recipient: PersistedKeeperModel, subject: string, body: string, extraPayload: any) {
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
  public notifyClosestBeekeeper(hive: PersistedHiveModel): boolean {

    console.log('Notifying closest beekeeper about Hive ' + hive.uid);

    this.getClosestToHive(hive).then(closestBeekeeper => {

      HiveManager.updateClaim(hive, closestBeekeeper)
        .then(updatedClaim => {

          this.sendMessage(
            closestBeekeeper,
            'Neuen Bienenschwarm gefunden!',
            'Es wurde ein neuer Bienenschwarm in deiner Nähe gemeldet. Jetzt anschauen und beanspruchen!',
            {
              link: environment.baseUrl + '/hive/' + hive.uid + '/?token=' + updatedClaim.token
            }
          );
        })
        .catch(error => {
          console.error('Unable to create claim on hive due to the following error: ' + error);
        });

    }).catch(() => {
      console.warn('No Beekeepers available for Hive ' + hive.uid);
      return false;
    });

    return true;
  }
}
