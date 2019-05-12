import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PwaService } from 'src/app/common/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public Pwa: PwaService) {
    this.Pwa.install();
  }
  version = environment.version;
}
