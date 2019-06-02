import { Injectable } from '@angular/core';
import { BasePersistenceService } from './base-persistence.service';
import { HiveModel } from '../../models/hive';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class HivePersistenceService extends BasePersistenceService<HiveModel> {
  public constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    super(store);
  }

  public upload(file: File) {
    const uid = this.store.createId();
    const fileExtension = file.name.split('.').pop();
    return this.storage.upload(`/${this.getCollectionName()}/${uid}.${fileExtension}`, file);
  }

  public download(uid: string) {
    return this.storage.ref(`/${this.getCollectionName()}/${uid}`).getDownloadURL();
  }

  protected getCollectionName(): string {
    return 'beehive';
  }
}
