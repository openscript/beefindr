export class Point {

  public latitude = 0.0;
  public longitude = 0.0;

  public constructor(lat = 0.0, lng = 0.0) {
    this.latitude = lat;
    this.longitude = lng;
  }

  private degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  /**
   * Shamelessly stolen from https://www.movable-type.co.uk/scripts/latlong.html ^^
   * @param otherPoint Other point on the map to which to calculate the distance
   */
  public distanceTo(otherPoint: Point): number {

    const R = 6371e3; // metres
    const lat1 = this.degreesToRadians(this.latitude);
    const lat2 = this.degreesToRadians(otherPoint.latitude);
    const dLat = this.degreesToRadians(otherPoint.latitude - this.latitude);
    const dLng = this.degreesToRadians(otherPoint.longitude - this.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
