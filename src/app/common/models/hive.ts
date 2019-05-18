import { Finder } from './finder';
import { BaseEntity } from './base-entity';

export interface Hive extends BaseEntity {
  finder: Finder;
}
