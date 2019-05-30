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

  public currentMessage = new BehaviorSubject(null);

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
   */
  public requestPermission(forBeekeeper: BeeKeeper) {
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
  public listenForMessages() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.currentMessage.next(payload);
      });
  }
}
