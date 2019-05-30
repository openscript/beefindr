import { BaseEntity } from './base-entity';
import { FinderModel } from './finder';
import { LocationModel } from './location';

export interface HiveModel extends BaseEntity {
  finder: FinderModel;
  location: LocationModel;
  photo?: string;
  assignedBeekeeper?: string;
  declinedByBeekeepers?: string[];
}

export interface Hive extends HiveModel {
  wasDeclinedBy(beekeeper: string): void;
  decline(beekeeper: string): void;
}

export class Hive {
  public constructor(hive: HiveModel) {
    Object.assign(this, hive);
  }

  public wasDeclinedBy(beekeeper: string) {
    return this.declinedByBeekeepers && this.declinedByBeekeepers.indexOf(beekeeper) >= 0;
  }

  public decline(beekeeper: string) {
    if (this.declinedByBeekeepers) {
      this.declinedByBeekeepers = [];
    }

    if (!this.wasDeclinedBy(beekeeper)) {
      this.declinedByBeekeepers.push();
    }
  }
}
