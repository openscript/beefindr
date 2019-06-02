import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationActivate implements CanActivate {
  public constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  public canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['user', 'login']);
    }
    return true;
  }
}
