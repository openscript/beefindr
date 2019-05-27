import {Injectable} from '@angular/core';
import {BasePersistenceService} from './base-persistence.service';
import {Hive} from '../models/hive';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {HiveClaim} from '../models/hiveClaim';


@Injectable({
  providedIn: 'root'
})
export class HiveClaimPersistenceService extends BasePersistenceService<Hive> {
  public constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    super(store);
  }

  protected getCollectionName(): string {
    return 'beehiveClaim';
  }

  public getClaimForToken(token: string): Promise<HiveClaim> {

    return new Promise((succ, err) => {

      this.persistence.ref
        .where('token', '==', token)
        .get()
        .then(snapshots => {
          if (snapshots.docs.length === 1) {
            succ({
              id: snapshots[0].id,
              ...snapshots[0].data()
            } as HiveClaim);
          } else {
            err();
          }
        });
    });
  }
}
