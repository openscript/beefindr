import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardActivate implements CanActivate {
  public constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  public canActivate() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['user', 'dashboard']);
    }
    return true;
  }
}
