import { Component, OnInit } from '@angular/core';
import { PwaService } from 'src/app/common/services/pwa.service';
import { VersionUtil } from './utils/version.util';
import { AuthService } from './common/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public version = VersionUtil.getVersionString();
  public username?: string;

  public constructor(
    private pwa: PwaService,
    private auth: AuthService
  ) { }

  public ngOnInit() {
    this.pwa.install();
    this.auth.user.subscribe((user) => {
      this.username = user ? user.displayName : null;
    });
  }

  public logout() {
    this.auth.signOut();
  }
}
