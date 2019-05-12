import {AbstractModel} from './abstract.model';
import {Point} from './point.model';


export abstract class LocationBasedModel extends AbstractModel {

  private location: Point = new Point(0.0, 0.0);

  public constructor(data: any) {
    super(data);
    this.inflate(data);

    // TODO: Maybe solve nested serialization/deserialization on AbstractModel-level ...
    if (data.hasOwnProperty('location')) {
      data.location = new Point(data.location.latitude, data.location.longitude);
      this.location = new Point(data.location.latitude, data.location.longitude);
    }
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
