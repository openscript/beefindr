import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationPickerComponent } from './geolocation-picker.component';

describe('GeolocationPickerComponent', () => {
  let component: GeolocationPickerComponent;
  let fixture: ComponentFixture<GeolocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
