import '@firebase/firestore';
import firebase from '@firebase/app';

import {AbstractModel} from '../../common/models/abstract.model';


/**
 * Simple example of a concrete Model-implementation.
 */
export class Message extends AbstractModel {

  public msg = 'f';
  public created: firebase.firestore.Timestamp = firebase.firestore.Timestamp.fromDate(new Date());

  /**
   * Constructor. Due to the order in which super/subclasses are initialized
   * we have to call ``inflate`` explicitly for this subclass in order
   * to have all fields of the subclass properly initialized.
   * (see http://joelleach.net/2016/11/18/setting-subclass-properties-in-typescript/ for further details)
   *
   * @param data Serialized data to be used for instance inflation
   */
  public constructor(data: object) {
    super(data);
    this.inflate(data);
  }
}
