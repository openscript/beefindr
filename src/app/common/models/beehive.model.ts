import {BeeKeeper} from './beekeeper.model';
import {LocationBasedModel, SerializedLocationBaseModel} from './location-based.model';
import { Finder } from './finder';


export interface SerializedBeeHive extends SerializedLocationBaseModel {
  declinedBeekeeperUIDs?: string[];
}

export class BeeHive extends LocationBasedModel {

  // private assignedBeekeeperUID = '';
  private declinedBeekeeperUIDs: string[] = [];

  /**
   * Constructor. Due to the order in which super/subclasses are initialized
   * we have to call ``inflate`` explicitly for this subclass in order
   * to have all fields of the subclass properly initialized.
   * (see http://joelleach.net/2016/11/18/setting-subclass-properties-in-typescript/ for further details)
   *
   * @param data Serialized data to be used for instance inflation
   */
  public constructor(data: SerializedBeeHive) {
    super(data);
    this.inflate(data);
  }

  public wasDeclinedByKeeper(keeper: BeeKeeper) {
    return this.declinedBeekeeperUIDs.indexOf(keeper.id) >= 0;
  }
}
