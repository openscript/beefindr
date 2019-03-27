import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AbstractFirestoreOrmService} from '../../common/services/abstract-firestore-orm.service';
import {Message} from '../models/message.model';


/**
 * Sample implementation of a concrete Model-Service implementation.
 */
@Injectable()
export class MessageService extends AbstractFirestoreOrmService<Message> {

  public constructor(protected fireStore: AngularFirestore) {
    super(fireStore);
  }

  /**
   * Example of a specialized instance retrieval method.
   * Basically makes use of the ``listItems`` method of the super class, but
   * passes it a query function to retrieve messages sorted by their
   * creation timestamp.
   */
  public getSortedMessages(): Observable<Message[]> {
    return this.listItems(ref => ref.orderBy('created'));
  }

  public getCollectionName(): string {
    return 'messages';
  }

  public getModelClass() {
    return Message;
  }
}
