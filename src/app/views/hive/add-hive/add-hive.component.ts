import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HivePersistenceService } from 'src/app/common/services/persistence/hive-persistence.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HiveModel } from 'src/app/common/models/hive';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { LocationModel } from 'src/app/common/models/location';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.scss']
})
export class AddHiveComponent {

  // Form definition
  public hiveForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ...AddressFormComponent.DEFAULT_ADDRESS_FORM,
    email: new FormControl('', [Validators.required, Validators.email])
  });

  // Component state
  public submitted = false;
  public loading = false;
  public selectedPhoto: File;
  public uploadProgress: Observable<number>;
  private location: LocationModel = null;

  public constructor(
    private domSanitizer: DomSanitizer,
    private hivePersistence: HivePersistenceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public onSelectPhoto(uploadField: HTMLInputElement) {
    if (uploadField.files.length > 0 && uploadField.files[0]) {
      this.selectedPhoto = uploadField.files[0];
    }
  }

  public get selectedPhotoBlob() {
    return this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPhoto));
  }

  public onTakePhoto(uploadField: HTMLInputElement) {
    uploadField.click();
  }

  public onSubmit() {
    if (this.hiveForm.valid && this.location) {
      this.submitted = true;
      this.loading = true;

      if (this.selectedPhoto) {
        const uploadTask = this.hivePersistence.upload(this.selectedPhoto);
        this.uploadProgress = uploadTask.percentageChanges();
        uploadTask.then((change) => {
          this.saveHive(change.ref.name);
        });
      } else {
        this.saveHive();
      }
    }
  }

  public onNewLocation(location: LocationModel) {
    this.location = location;
  }

  private saveHive(photo?: string) {
    const newHive: HiveModel = { finder: {...this.hiveForm.value}, location: {...this.location} };
    if (photo) {
      newHive.photo = photo;
    }
    this.hivePersistence.add(newHive).then((hive) => {
      this.loading = false;
      this.snackBar.open(`Vielen Dank ${hive.finder.name}! Der Schwarm wurde erfolgreich erfasst.`, '', {duration: 4000});
      this.router.navigate(['hive', hive.uid]);
    });
  }
}
