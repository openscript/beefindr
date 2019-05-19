import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-dashboard-beekeeper',
  templateUrl: './dashboard-beekeeper.component.html',
  styleUrls: ['./dashboard-beekeeper.component.scss']
})
export class DashboardBeekeeperComponent implements OnInit {

  constructor(public auth: AuthService) { }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
  }

}
