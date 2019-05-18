import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.scss']
})
export class AddHiveComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  currentPosition: Position = null;

  constructor() { }

  public ngOnInit() {
  }

  public takePhoto() {
    // TODO: Implement the ability to take photos
    alert('Not implemented yet');
  }

  public getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = position;
      });
    } else {
      console.error('Browser doesn\'t support geolcation tracking.');
    }
  }

}
