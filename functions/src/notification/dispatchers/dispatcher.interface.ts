import {BeeKeeper} from '../../../../src/app/common/models/beekeeper.model';


/**
 * Dispatchers are specific implementations of message delivery, e.g. E-Mail, SMS, Push, ...
 */
export interface Dispatcher {
  dispatchMessage(recipient: BeeKeeper, subject: string, body: string, extraPayload?: any): void;
}
