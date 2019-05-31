import {KeeperModel} from '../../../../../src/app/common/models/keeper';


export interface PersistedKeeperModel extends KeeperModel {
  uid: string;
}
