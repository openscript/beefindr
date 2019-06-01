import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../common/services/auth.service';
import { NotifyService } from '../../../common/services/notify.service';
import { KeeperPersistenceService } from 'src/app/common/services/keeper-persistence.service';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { KeeperModel } from 'src/app/common/models/keeper';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [
    AngularFirestore,
    AuthService,
    NotifyService
  ]
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  // Form definition
  public keeperForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ...AddressFormComponent.DEFAULT_ADDRESS_FORM,
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // Component state
  public submitted = false;
  public loading = false;
  public registerForm: FormGroup;
  public hide = true;
  public currentPosition: Position = null;
  private geoLocationID: number;

  public constructor(
    private keeperPersistence: KeeperPersistenceService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.toggleGeoLocation();
  }

  public ngOnDestroy() {
    this.toggleGeoLocation();
  }

  public onSubmit() {
    if (this.keeperForm.valid) {
      this.submitted = true;
      this.loading = true;

      this.authService.emailSignUp(
        this.keeperForm.get('email').value,
        this.keeperForm.get('password').value
      ).then(() => {
        const location = {
          accuracy: this.currentPosition.coords.accuracy,
          latitude: this.currentPosition.coords.latitude,
          longitude: this.currentPosition.coords.longitude
        };
        const { password, ...keeper } = this.keeperForm.value;
        const newKeeper: KeeperModel = { ...keeper, location };
        this.keeperPersistence.add(newKeeper).then(() => {
          this.snackBar.open('Willkommen bei BeeFinder! Danke für die Registrierung.', '', { duration: 4000 });
          this.router.navigate(['user', 'dashboard']);
        });
      }).catch(() => {
        this.snackBar.open('Leider ist bei der Registrierung etwas schief gegangen.', '', { duration: 4000 });
        this.keeperForm.reset();
        this.loading = false;
        this.submitted = false;
      });
    }
  }

  private toggleGeoLocation() {
    if (navigator.geolocation) {
      if (!this.geoLocationID) {
        this.geoLocationID = navigator.geolocation.watchPosition((position) => {
          this.currentPosition = position;
        });
      } else {
        navigator.geolocation.clearWatch(this.geoLocationID);
      }
    }
  }
}
