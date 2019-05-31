import {HiveModel} from '../../../../../src/app/common/models/hive';


export interface PersistedHiveModel extends HiveModel {
  uid: string;
}
