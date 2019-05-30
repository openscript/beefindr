import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { KeeperModel } from '../models/keeper';
import { BehaviorSubject } from 'rxjs';
import { KeeperPersistenceService } from './keeper-persistence.service';
import { Injectable } from '@angular/core';

/**
 * Firebase Cloud Messaging service.
 *
 * https://medium.com/@a.adendrata/push-notifications-with-angular-6-firebase-cloud-massaging-dbfb5fbc0eeb
 */
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  public currentMessage = new BehaviorSubject(null);

  public constructor(
    protected keeperPersistenceService: KeeperPersistenceService,
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
  public requestPermission(forBeekeeper: KeeperModel) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        forBeekeeper.messagingID = token;
        this.keeperPersistenceService.update(forBeekeeper);
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
