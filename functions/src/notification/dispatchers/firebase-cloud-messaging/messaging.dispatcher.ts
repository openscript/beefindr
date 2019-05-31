import * as admin from 'firebase-admin';
import {KeeperModel} from '../../../../../src/app/common/models/keeper';
import {Dispatcher} from '../dispatcher.interface';


/**
 * Google Cloud Messaging dispatcher using a device/user token to send
 * messages to a specific user.
 */
export class MessagingDispatcher implements Dispatcher {

  public async dispatchMessage(recipient: KeeperModel, subject: string, body: string, extraPayload?: any) {

    const deviceToken = recipient.messagingID;

    if (deviceToken) {
      await admin.messaging().sendToDevice(
        deviceToken,
        {
          notification: {
            title: subject,
            body,
          },
          data: extraPayload
        });
      return true;
    }

    return Promise.reject('No Device token for recipient ' + recipient.uid);
  }
}
