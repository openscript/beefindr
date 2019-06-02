import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { KeeperPersistenceService } from './persistence/keeper-persistence.service';
import { KeeperModel } from '../models/keeper';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User | null>;

  public constructor(
    private keeperPersistence: KeeperPersistenceService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.angularFireAuth.user;
  }

  public emailSignUpKeeper(keeper: KeeperModel, password: string) {
    return this.emailSignUp(keeper.email, password).then((credential) => {
      credential.user.updateProfile({ displayName: keeper.name });
      const newKeeper = { ...keeper, userUID: credential.user.uid };
      return this.keeperPersistence.add(newKeeper);
    });
  }

  private emailSignUp(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public emailLogin(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['user', 'dashboard']);
    });
  }

  public isLoggedIn() {
    return !!this.angularFireAuth.auth.currentUser;
  }

  public signOut() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
