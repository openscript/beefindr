import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
  providers: [AngularFirestore]
})
export class LoginUserComponent {

  // Form definition
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // Component state
  public loading = false;
  public submitted = false;
  public hide = true;

  public constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
  ) {  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.loading = true;

      this.authService.emailLogin(this.loginForm.get('email').value, this.loginForm.get('password').value).catch(() => {
        this.snackBar.open('Anmelden fehlgeschlagen', '', { duration: 4000 });
        this.submitted = false;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
