import {AbstractFirestoreOrmService} from './abstract-firestore-orm.service';
import {AbstractModel, SerializedAbstractModel} from '../models/abstract.model';
import {Observable} from 'rxjs';


/**
 * Dummy Model and Dummy fire store for testing
 */
interface SerializedDummyModel extends SerializedAbstractModel {
  title: string;
  body: string;
}

class DummyModel extends AbstractModel {
  title = '';
  body = '';

  public constructor(data: SerializedDummyModel) {
    super(data);
    this.inflate(data);
  }
}

export class DummyFireStore {

  private objects = [];

  public constructor() {
  }

  createPayload(objs, useWrapper: boolean = true) {
    const items = [];
    for (const obj of objs) {
      items.push(
        useWrapper ? {
          payload: {
            doc: {
              id: 'id',
              data: () => {
                return {...obj};
              }
            }
          }
        } : {
          id: 'id',
          data: () => {
            return {...obj};
          }
        });
    }
    return items;
  }

  collection() {
    return {
      snapshotChanges: () => new Observable<any>(observer => {
        observer.next(this.createPayload(this.objects));
        observer.complete();
      }),
      add: (data: SerializedAbstractModel) => new Promise((succ, err) => {
        this.objects.push(data);
        succ(data);
      }),
      get: () => {
        return new Promise((succ, err) => {
          succ(this.createPayload(this.objects, false));
        });
      }
    };
  }

  public doc() {
    return {
      snapshotChanges: () => new Observable<any>(observer => {
        observer.next({
          payload: {
            id: 'id',
            data: () => {

            }
          }
        });
        observer.complete();
      })
    };
  }
}

export class DummyModelService extends AbstractFirestoreOrmService<DummyModel, SerializedDummyModel> {

  public getCollectionName(): string {
    return 'dummy-collection';
  }

  public getModelClass(): any {
    return DummyModel;
  }
}

describe('Abstract Firestore ORM Service', () => {

  let service: DummyModelService;

  beforeEach(() => {
    service = new DummyModelService(new DummyFireStore());
  });

  it('maps single instance data correctly', (done) => {

    service.createItem(
      new DummyModel({
        title: 'A nice title',
        body: 'Lorem ipsum dolor sit amet.'
      })
    ).then((item1) => {
      service.createItem(
        new DummyModel({
          title: 'Another nice title',
          body: 'Lorem ipsum dolor sit amet.'
        })
      ).then((item2) => {
        service.listItems().subscribe(
          items => {

            expect(items.length).toBe(
              2,
              'Expected ORM to return 2 items after 2 items were created using \'createItem\' ' +
              'but received ' + items.length + ' items!');

            expect(items[0] instanceof AbstractModel).toBeTruthy(
              'Expected items returned by the ORM to be of class \'AbstractModel\' but ' +
              'the are not!'
            );

            done();
          }
        );
      });
    });
  });
});
