import { AngularFirestore } from '@angular/fire/firestore';
import { BasePersistenceService } from './base-persistence.service';
import { Injectable } from '@angular/core';
import { KeeperModel } from '../../models/keeper';


@Injectable({
  providedIn: 'root'
})
export class KeeperPersistenceService extends BasePersistenceService<KeeperModel> {

  public constructor(
    private store: AngularFirestore
  ) {
    super(store);
  }

  protected getCollectionName() {
    return 'beekeeper';
  }
}
