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

  constructor() { }

  public ngOnInit() {
  }

  private takePhoto() {
    // TODO: Implement the ability to take photos
    alert('Not implemented yet');
  }

  private getGeoLocation() {
    alert('Not implemented yet');
  }

}
