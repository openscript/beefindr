import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geolocation-picker',
  templateUrl: './geolocation-picker.component.html',
  styleUrls: ['./geolocation-picker.component.scss']
})
export class GeolocationPickerComponent implements OnInit, OnDestroy {

  @Output() public newLocation: EventEmitter<Pick<Coordinates, 'latitude' | 'longitude' | 'accuracy'>> = new EventEmitter();

  // Component state
  public loading = false;
  public currentPosition: Position = null;
  public errorMessage: string;
  private geoLocationID: number;

  public constructor() { }

  public ngOnInit() {
    if (navigator.geolocation) {
      if (!this.geoLocationID) {
        this.loading = true;
        this.geoLocationID = navigator.geolocation.watchPosition((position) => {
          this.loading = false;
          this.newLocation.emit({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          this.currentPosition = position;
        }, (error) => {
          this.loading = false;
          if (error.PERMISSION_DENIED) {
            this.errorMessage = 'Keine Berechtigung um auf die GPS-Daten zuzugreifen.';
          } else {
            this.errorMessage = 'Beim Abrufen der GPS-Daten ist ein Fehler aufgetreten.';
          }
        });
      } else {
        navigator.geolocation.clearWatch(this.geoLocationID);
      }
    }
  }

  public ngOnDestroy() {
    if (navigator.geolocation) {
      if (this.geoLocationID) {
        navigator.geolocation.clearWatch(this.geoLocationID);
      }
    }
  }

}
