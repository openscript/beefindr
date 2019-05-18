import { Injectable } from '@angular/core';
import { BasePersistenceService } from './base-persistence.service';
import { Hive } from '../models/hive';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HivePersistenceService extends BasePersistenceService<Hive> {
  public constructor(afs: AngularFirestore) {
    super(afs);
  }

  protected getCollectionName(): string {
    return 'hive';
  }
}
