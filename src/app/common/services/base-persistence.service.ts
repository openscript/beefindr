import { BaseEntity } from '../models/base-entity';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

/**
 * Base persistence service which implements CRUD operations.
 */
export abstract class BasePersistenceService<T extends BaseEntity> {

  protected persistence: AngularFirestoreCollection<T>;

  public constructor(afs: AngularFirestore) {
    this.persistence = afs.collection(`${this.getCollectionName()}`);
  }

  public get(uid: string): Observable<T> {
    return this.persistence.doc<T>(uid).snapshotChanges().pipe(map(change => {
      if (change.payload.exists) {
        return { uid: change.payload.id, ...change.payload.data() };
      }
    }));
  }

  public index(): Observable<T[]> {
    return this.persistence.snapshotChanges().pipe(map(changes => {
      return changes.map(data => {
        return { uid: data.payload.doc.id, ...data.payload.doc.data() };
      });
    }));
  }

  public add(record: T): Promise<T> {
    return new Promise<T>((resolve) => {
      this.persistence.add(record).then(ref => {
        resolve({uid: ref.id, ...record});
      });
    });
  }

  public update(record: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!record.uid) {
        reject('No unique identifier is given for record.');
      } else {
        this.persistence.doc<T>(record.uid).set(record).then(() => {
          resolve({...record});
        });
      }
    });
  }

  public delete(uid: string): Promise<void> {
    return this.persistence.doc<T>(uid).delete();
  }

  protected abstract getCollectionName(): string;
}
