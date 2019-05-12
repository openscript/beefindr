import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {BeeKeeper} from '../models/beekeeper.model';
import {BehaviorSubject} from 'rxjs';
import {InjectableBeekeeperService} from './injectable-services.service';


/**
 * Firebase Cloud Messaging service.
 *
 * https://medium.com/@a.adendrata/push-notifications-with-angular-6-firebase-cloud-massaging-dbfb5fbc0eeb
 */
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    protected beekeeperService: InjectableBeekeeperService,
    protected angularFireAuth: AngularFireAuth,
    protected angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (messaging) => {
        messaging.onMessage = messaging.onMessage.bind(messaging);
        messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
      }
    );
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param forBeekeeper
   */
  requestPermission(forBeekeeper: BeeKeeper) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        forBeekeeper.setMessagingID(token);
        this.beekeeperService.updateItem(forBeekeeper);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  listenForMessages() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        alert('Neuen Bienenschwarm gefunden!');
        this.currentMessage.next(payload);
      });
  }
}
