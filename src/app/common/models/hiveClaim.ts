import { BaseEntity } from './base-entity';


export interface HiveClaim extends BaseEntity {
  created: Date;
  updated: Date;
  claimed: boolean;
  hiveUid: string;
  keeperUid: string;
}
