import { Component } from '@angular/core';
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
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';
import { KeeperModel } from 'src/app/common/models/keeper';
import { LocationModel } from 'src/app/common/models/location';

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
export class RegisterUserComponent {

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
  private location: LocationModel = null;

  public constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  public onSubmit() {
    if (this.keeperForm.valid && this.location) {
      this.submitted = true;
      this.loading = true;

      const { password, ...keeper } = this.keeperForm.value;
      const newKeeper: KeeperModel = { ...keeper, location: this.location };

      this.authService.emailSignUpKeeper(
        newKeeper,
        this.keeperForm.get('password').value
      ).then((actualKeeper) => {
        this.snackBar.open(`Willkommen bei BeeFinder! Danke ${actualKeeper.name} für die Registrierung`, '', { duration: 4000 });
        this.router.navigate(['user', 'dashboard']);
      }).catch(() => {
        this.snackBar.open('Leider ist bei der Registrierung etwas schief gegangen.', '', { duration: 4000 });
        this.keeperForm.reset();
        this.loading = false;
        this.submitted = false;
      });
    }
  }

  public onNewLocation(location: LocationModel) {
    this.location = location;
  }
}
