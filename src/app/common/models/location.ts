export interface LocationModel {
  accuracy: number;
  latitude: number;
  longitude: number;
}

export interface Location extends LocationModel {
  distanceTo(other: LocationModel): number;
}

export class Location {
  public constructor(location: LocationModel) {
    Object.assign(this, location);
  }

  /**
   * @see https://www.movable-type.co.uk/scripts/latlong.html
   * @param other location on the map to which to calculate the distance
   */
  public distanceTo(other: LocationModel): number {
    const R = 6371e3; // metres
    const lat1 = this.degreesToRadians(this.latitude);
    const lat2 = this.degreesToRadians(other.latitude);
    const dLat = this.degreesToRadians(other.latitude - this.latitude);
    const dLng = this.degreesToRadians(other.longitude - this.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }
}
