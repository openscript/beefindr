import {AbstractFirestoreOrmService} from './abstract-firestore-orm.service';
import {BeeHive} from '../models/beehive.model';
import {AngularFirestore} from '@angular/fire/firestore';


export class BeehiveService extends AbstractFirestoreOrmService<BeeHive> {

  public constructor(protected fireStore: AngularFirestore) {
    super(fireStore);
  }

  public getCollectionName(): string {
    return 'beehive';
  }

  public getModelClass() {
    return BeeHive;
  }
}
