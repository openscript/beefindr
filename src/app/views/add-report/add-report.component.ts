import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  currentPosition: Position = null;

  constructor() { }

  public ngOnInit() {
  }

  protected takePhoto() {
    // TODO: Implement the ability to take photos
    alert('Not implemented yet');
  }

  protected getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = position;
      });
    } else {
      console.error('Browser doesn\'t support geolcation tracking.');
    }
  }

}
