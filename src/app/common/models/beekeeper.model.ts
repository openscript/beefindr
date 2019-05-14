import {LocationBasedModel, SerializedLocationBaseModel} from './location-based.model';

export interface SerializedBeeKeeper extends SerializedLocationBaseModel {
  email?: string;
  messagingID?: string;
  firstname?: string;
}

export class BeeKeeper extends LocationBasedModel {

  private email = '';
  private messagingID = '';

  public firstname = '';

  /**
   * Constructor. Due to the order in which super/subclasses are initialized
   * we have to call ``inflate`` explicitly for this subclass in order
   * to have all fields of the subclass properly initialized.
   * (see http://joelleach.net/2016/11/18/setting-subclass-properties-in-typescript/ for further details)
   *
   * @param data Serialized data to be used for instance inflation
   */
  public constructor(data: SerializedBeeKeeper ) {
    super(data);
    this.inflate(data);
  }

  public getEmail(): string {
    return this.email;
  }

  public getMessagingID(): string {
    return this.messagingID;
  }

  public setMessagingID(id: string) {
    this.messagingID = id || this.messagingID;
  }
}

