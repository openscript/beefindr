import { BaseEntity } from './base-entity';
import { Finder } from './finder';
import { Location } from './location';

export interface Hive extends BaseEntity {
  finder: Finder;
  location: Location;
}
