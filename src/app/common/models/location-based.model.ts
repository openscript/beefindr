import {AbstractModel, SerializedAbstractModel} from './abstract.model';
import {Point} from './point.model';


export interface SerializedLocationBaseModel extends SerializedAbstractModel {
  location: {
    latitude: number,
    longitude: number
  };
}

export abstract class LocationBasedModel extends AbstractModel {

  private location: Point = new Point(0.0, 0.0);

  public constructor(data: SerializedLocationBaseModel) {
    super(data);
    this.inflate(data);

    // TODO: Maybe solve nested serialization/deserialization on AbstractModel-level ...
    // Note: We deserialize the location to a Point instance and store it on the data
    // object, too, so that later deserialization on inheriting classes does not override
    // the location attribute with the serialized location object.
    data.location = new Point(data.location.latitude, data.location.longitude);
    this.location = new Point(data.location.latitude, data.location.longitude);

  }

  public getLocation(): Point {
    return this.location;
  }

  public deflate(): object {
    const data: any = super.deflate();
    data.location = {...this.location};
    return data;
  }
}
