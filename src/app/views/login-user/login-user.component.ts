import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BeeKeeper } from '../../common/models/beekeeper.model';
import { InjectableBeekeeperService } from '../../common/services/injectable-services.service';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../common/services/auth.service';
import { NotifyService } from '../../common/services/notify.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
  providers: [InjectableBeekeeperService, AngularFirestore]
})
export class LoginUserComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  @ViewChild('namefocus', { static: true }) nameInput: MatInput;

  constructor(private formBuilder: FormBuilder,
              private beeKeeperService: InjectableBeekeeperService, public snackBar: MatSnackBar,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.emailLogin(this.f.email.value, this.f.password.value).then(() => {
      this.loginForm.reset();
      this.nameInput.focus();
    }).catch(error => {
      // handle error
      this.loginForm.reset();
      this.nameInput.focus();
    });
  }

}
