import { BaseEntity } from './base-entity';
import { FinderModel } from './finder';
import { LocationModel } from './location';

export interface KeeperModel extends FinderModel, BaseEntity {
  location: LocationModel;
  messagingID: string;
  userUID: string;
}

export interface Keeper extends KeeperModel {
}

export class Keeper {
  public constructor(keeper: KeeperModel) {
    Object.assign(this, keeper);
  }
}
