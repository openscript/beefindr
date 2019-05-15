import {DocumentChangeAction, QueryFn} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AbstractModel, SerializedAbstractModel} from '../models/abstract.model';


/**
 * Basic ORM Service using Firestore. Subclasses provide a Model using
 * the generic M.
 */
export abstract class AbstractFirestoreOrmService<M extends AbstractModel, I extends SerializedAbstractModel> {

  /**
   * Constructor
   *
   * @param fireStore FireStore service for database interaction
   */
  public constructor(
    protected fireStore: {
      collection<Model extends AbstractModel>(collectionName: string, queryFn?: QueryFn): any,
      doc<Model extends AbstractModel>(collectionName: string): any
    }) {
  }

  private mapToModel(serializedData: I) {
    const modelClass = this.getModelClass();
    return new modelClass(serializedData);
  }

  private mapManyToModel(serializedData: I[]): M[] {

    const modelClass = this.getModelClass();
    const instances: M[] = [];

    for (const itemData of serializedData) {
      instances.push(new modelClass(itemData));
    }

    return instances;
  }

  /**
   * Utility method to map documents from the database
   * to model instances.
   *
   * @param many True if a collection of documents should be mapped to instances,
   * False if only a single instance should be mapped.
   */
  protected mapToModelPipe(many: boolean = false) {

    if (many) {
      return map((changeActions: DocumentChangeAction<any>[]) => {
        return this.mapManyToModel(changeActions.map((ca) => {
          return {id: ca.payload.doc.id, ...ca.payload.doc.data()};
        }));
      });
    }

    return map((doc: any) => {
      return this.mapToModel({id: doc.payload.id, ...doc.payload.data()});

    });
  }

  /**
   * Create a new item in the database.
   * Returns a new item instance that contains the database item-id.
   *
   * @param instance Model instance to be created in the database
   */
  public createItem(instance: M): Promise<M> {
    return new Promise<M>((resolve, reject) => {
      this.fireStore
        .collection(this.getCollectionName())
        .add(instance.deflate())
        .then((doc: SerializedAbstractModel) => {
            resolve(new (this.getModelClass())({
              id: doc.id,
              ...instance
            }));
          }
        );
    });
  }

  /**
   * Returns an Observable to listen for database updates
   */
  public listItems(queryFn?: any): Observable<M[]> {
    return this.fireStore
      .collection<M>(this.getCollectionName(), queryFn)
      .snapshotChanges()
      .pipe(
        this.mapToModelPipe(true)
      );
  }

  public listItemsStatic(queryFn?: any): Promise<M[]> {
    return new Promise((succ, err) => {
      this.fireStore
        .collection(this.getCollectionName(), queryFn)
        .get()
        .then((querySnapshot: any) => {
          const items: M[] = [];

          querySnapshot.forEach((doc: any) => {
            items.push(
              this.mapToModel(
                {id: doc.id, ...doc.data()}
              )
            );
          });

          succ(items);
        });
    });
  }

  /**
   * Retrieves an item for a given id.
   *
   * @param id Id for which to retrieve an item.
   */
  public getItem(id: string): Observable<M> {
    return this.fireStore
      .doc<M>(`${this.getCollectionName()}/${id}`)
      .snapshotChanges()
      .pipe(
        this.mapToModelPipe()
      );
  }

  /**
   * Updates an existing model instance.
   *
   * @param instance Instance to be updated in the database
   */
  public updateItem(instance: M): Promise<void> {
    return this.fireStore
      .doc<M>(`${this.getCollectionName()}/${instance.id}`)
      .update(instance.deflate());
  }

  /**
   * Deletes an instance from the database.
   *
   * @param instance Instance to be deleted
   */
  public deleteItem(instance: M): Promise<void> {
    return this.fireStore.doc<M>(`${this.getCollectionName()}/${instance.id}`).delete();
  }

  public abstract getCollectionName(): string;
  public abstract getModelClass(): any;
}
