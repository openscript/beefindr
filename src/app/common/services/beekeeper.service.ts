import {AbstractFirestoreOrmService} from './abstract-firestore-orm.service';
import {BeeKeeper, SerializedBeeKeeper} from '../models/beekeeper.model';


export class BeekeeperService extends AbstractFirestoreOrmService<BeeKeeper, SerializedBeeKeeper> {


  public getCollectionName(): string {
    return 'beekeeper';
  }

  public getModelClass() {
    return BeeKeeper;
  }
}
