import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HivePersistenceService } from 'src/app/common/services/hive-persistence.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hive } from 'src/app/common/models/hive';

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

  // Component state
  public submitted = false;
  public loading = false;
  public currentPosition: Position = null;

  /**
   * @param hivePersistence is used to save the data from the form.
   */
  public constructor(
    private hivePersistence: HivePersistenceService,
    private router: Router,
    private snackBar: MatSnackBar
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
      this.loading = true;

      const newHive: Hive = { finder: {...this.hiveForm.value} };
      this.hivePersistence.add(newHive).then((hive) => {
        this.loading = false;
        this.snackBar.open(`Vielen Dank ${hive.finder.name}! Der Schwarm wurde erfolgreich erfasst.`, '', {duration: 4000});
        this.router.navigate(['']);
      });
    }
  }
}
