import * as admin from 'firebase-admin';
import {BeeKeeper} from '../../../../../src/app/common/models/beekeeper.model';
import {Dispatcher} from '../dispatcher.interface';


/**
 * Google Cloud Messaging dispatcher using a device/user token to send
 * messages to a specific user.
 */
export class MessagingDispatcher implements Dispatcher {

  public dispatchMessage(recipient: BeeKeeper, subject: string, body: string, extraPayload?: any): void {

    const deviceToken = recipient.getMessagingID();

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
