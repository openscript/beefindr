import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HivePersistenceService } from 'src/app/common/services/hive-persistence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.scss']
})
export class AddHiveComponent implements OnInit {

  // Form definition
  public hiveForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl(''),
      zip: new FormControl(''),
      place: new FormControl('')
    }),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  // Form models
  public submitted = false;
  public currentPosition: Position = null;

  /**
   * @param hivePersistence is used to save the data from the form.
   */
  public constructor(
    private hivePersistence: HivePersistenceService,
    private router: Router
  ) { }

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

  public onSubmit() {
    if (this.hiveForm.valid) {
      this.submitted = true;
      this.hivePersistence.add(this.hiveForm.value).then(() => {
        this.router.navigate(['']);
      });
    }
  }
}
