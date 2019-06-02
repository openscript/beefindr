import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService
  ) {}

  public canActivate() {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.notify.update('You must be logged in!', 'error');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
