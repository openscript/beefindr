import {Dispatcher} from "../dispatcher.interface";
import {BeeKeeper} from "../../../../src/app/common/models/beekeeper.model";

export class LogDispatcher implements Dispatcher {

  dispatchMessage(subject: string, body: string, recipient: BeeKeeper): void {
    console.info(
      'Dispatching Message with subject "' + subject +'", body "' + body + '" to beekeeper ' + recipient.id
    )
  }
}
