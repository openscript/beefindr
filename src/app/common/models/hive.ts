import { Base } from './base';
import { Finder } from './finder';

export class Hive extends Base {

  constructor(
    public finder: Finder,
  ) {
    super();
  }
}
