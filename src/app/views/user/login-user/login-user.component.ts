import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
  providers: [AngularFirestore]
})
export class LoginUserComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public hide = true;

  @ViewChild('namefocus', { static: true }) public nameInput: MatInput;

  public constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private authService: AuthService,
  ) {  }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public onSubmit() {
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
