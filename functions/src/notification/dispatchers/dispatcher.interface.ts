import {KeeperModel} from '../../../../src/app/common/models/keeper';


/**
 * Dispatchers are specific implementations of message delivery, e.g. E-Mail, SMS, Push, ...
 */
export interface Dispatcher {
  dispatchMessage(recipient: KeeperModel, subject: string, body: string, extraPayload?: any): Promise<boolean>;
}
