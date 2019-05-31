import { KeeperModel } from '../../../../../src/app/common/models/keeper';
import { Dispatcher } from '../dispatcher.interface';


export class LogDispatcher implements Dispatcher {

  public dispatchMessage(recipient: KeeperModel, subject: string, body: string, extraPayload?: any): void {
    console.info(
      'Dispatching Message with subject "' + subject + '", body "' + body + '" to beekeeper ' + recipient.uid
    )
  }
}
