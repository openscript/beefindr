import * as admin from 'firebase-admin';
import {KeeperModel} from '../../../../../src/app/common/models/keeper';
import {Dispatcher} from '../dispatcher.interface';


/**
 * Google Cloud Messaging dispatcher using a device/user token to send
 * messages to a specific user.
 */
export class MessagingDispatcher implements Dispatcher {

  public dispatchMessage(recipient: KeeperModel, subject: string, body: string, extraPayload?: any): void {

    const deviceToken = recipient.messagingID;

    if (deviceToken) {
      admin.messaging().sendToDevice(
        deviceToken,
        {
          notification: {
            title: subject,
            body,
          },
          data: extraPayload
        }).then(() => {
        console.log('Cloud message sent');
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
