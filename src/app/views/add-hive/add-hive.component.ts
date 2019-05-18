import { Component, OnInit } from '@angular/core';
import { Hive } from 'src/app/common/models/hive';
import { defaultFinder } from 'src/app/common/models/finder';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.scss']
})
export class AddHiveComponent implements OnInit {

  // Form models
  public hive: Hive = {finder: defaultFinder};
  public submitted = false;
  public currentPosition: Position = null;

  public constructor() {
  }

  public ngOnInit() {
  }

  public onTakePhoto() {
    // TODO: Implement the ability to take photos
    alert('Not implemented yet');
  }

  public onGetGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = position;
      });
    } else {
      console.error('Browser doesn\'t support geolcation tracking.');
    }
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
    }
  }

  public get formDataAsJSON() {
    return JSON.stringify(this.hive);
  }

}
