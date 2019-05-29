import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BeeKeeper } from '../../../common/models/beekeeper.model';
import { InjectableBeekeeperService } from '../../../common/services/injectable-services.service';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../common/services/auth.service';
import { NotifyService } from '../../../common/services/notify.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [InjectableBeekeeperService, AngularFirestore, AuthService, NotifyService]
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  @ViewChild('namefocus', { static: true }) nameInput: MatInput;

  constructor(private formBuilder: FormBuilder,
              private beeKeeperService: InjectableBeekeeperService, private authService: AuthService,
              public snackBar: MatSnackBar, private router: Router, private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      streetname: ['', [Validators.required, Validators.pattern('^[ a-zA-ZäöüÄÖÜé.-]+$')]],
      streetnr: ['', [Validators.required, Validators.pattern('^[ a-zA-Z0-9]+$')]],
      postcode: ['', [Validators.required, Validators.pattern('^[ a-zA-Z0-9]+$')]],
      place: ['', [Validators.required, Validators.pattern('^[ a-zA-Z0-9äöüÄÖÜé.-]+$')]],
      country: ['', [Validators.required, Validators.pattern('^[ a-zA-ZäöüÄÖÜé.-]+$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.emailSignUp(this.f.email.value, this.f.password.value).then(() => {
      console.log('Login created');
      this.beeKeeperService.createItem(new BeeKeeper(
        {
          firstname: this.f.firstname.value,
          surname: this.f.surname.value,
          streetname: this.f.streetname.value,
          streetnr: this.f.streetnr.value,
          postcode: this.f.postcode.value,
          place: this.f.place.value,
          country: this.f.country.value,
          email: this.f.email.value,
          userUid: this.authService.uid,
          location: {
            latitude: 11,
            longitude: 11
          }
        })).then((beekeeper) => {
          console.log('Beekeeper created');
          this.snackBar.open('Danke für Ihre Registrierung bei BeeFinder!', 'Close', {
            duration: 20000,
          });
          this.router.navigate(['/dashboard-beekeeper']);
        }).catch(error => {
          // handle error
          this.registerForm.reset();
          this.nameInput.focus();
          this.snackBar.open('Registrierung hat leider nicht geklappt!', 'Close', {
            duration: 20000,
          });
        });
    }).catch(error => {
      // handle error
      this.registerForm.reset();
      this.nameInput.focus();
      this.snackBar.open('Registrierung hat leider nicht geklappt!', 'Close', {
        duration: 20000,
      });
    });

  }

}
