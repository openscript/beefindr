import {BeeKeeper} from "../../../../../src/app/common/models/beekeeper.model";
import {Dispatcher} from "../dispatcher.interface";


export class LogDispatcher implements Dispatcher {

  public dispatchMessage(recipient: BeeKeeper, subject: string, body: string, extraPayload?: any): void {
    console.info(
      'Dispatching Message with subject "' + subject + '", body "' + body + '" to beekeeper ' + recipient.id
    )
  }
}
