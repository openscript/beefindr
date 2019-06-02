import { Component } from '@angular/core';
import { PwaService } from 'src/app/common/services/pwa.service';
import { VersionUtil } from './utils/version.util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public version = VersionUtil.getVersionString();

  public constructor(public pwa: PwaService) {
    this.pwa.install();
  }
}
