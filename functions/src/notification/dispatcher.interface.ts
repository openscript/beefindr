import {BeeKeeper} from "../../../src/app/common/models/beekeeper.model";

export interface Dispatcher {
  dispatchMessage(subject: string, body: string, recipient: BeeKeeper): void;
}
