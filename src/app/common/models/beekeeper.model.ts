import {LocationBasedModel} from './location-based.model';


export class BeeKeeper extends LocationBasedModel {

  /**
   * Constructor. Due to the order in which super/subclasses are initialized
   * we have to call ``inflate`` explicitly for this subclass in order
   * to have all fields of the subclass properly initialized.
   * (see http://joelleach.net/2016/11/18/setting-subclass-properties-in-typescript/ for further details)
   *
   * @param data Serialized data to be used for instance inflation
   */
  public constructor(data: any) {
    super(data);
    this.inflate(data);
  }
}
