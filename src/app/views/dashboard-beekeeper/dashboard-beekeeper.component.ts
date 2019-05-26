import {AngularFireMessaging} from '@angular/fire/messaging';
import {AuthService} from '../../common/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {
  InjectableBeekeeperService,
  InjectableMessagingService
} from '../../common/services/injectable-services.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';


interface BeeHiveMessage {
  data: {
    link: string
  };
}

@Component({
  selector: 'app-dashboard-beekeeper',
  templateUrl: './dashboard-beekeeper.component.html',
  styleUrls: ['./dashboard-beekeeper.component.scss'],
  providers: [AngularFireMessaging, InjectableMessagingService, InjectableBeekeeperService]
})
export class DashboardBeekeeperComponent implements OnInit {

  constructor(
    private beeKeeperService: InjectableBeekeeperService,
    private messagingService: InjectableMessagingService,
    private router: Router,
    public auth: AuthService,
    public snackBar: MatSnackBar,
  ) {
  }

  /**
   * Asks the user/beekeeper for permission to receive and display notifications and
   * registers them with the Firebase Messaging Service.
   */
  private setUpMessaging() {

    // Create an observer for new messages an delegate them to a handler
    this.messagingService.currentMessage
      .pipe(filter(m => m != null))
      .subscribe(this.handleNewNotification);

    // Get the current user and its paired BeeKeeper and request permissions
    // for notifications, then start listening for messages.
    this.auth.user.subscribe(user => {
      this.beeKeeperService.listItems(ref => ref.where('userUid', '==', user.uid))
        .subscribe(keepers => {
          this.messagingService.requestPermission(keepers[0]);
          this.messagingService.listenForMessages();
        });
    });
  }

  /**
   * Handler for new notifications, displays a small
   * snack bar with the action link to the BeeHive.
   *
   * TODO: Use a better suited message display (like overlay) to
   * display notification more prominently
   *
   * @param notification Notification to be displayed
   */
  private handleNewNotification(notification: BeeHiveMessage) {
    const bar = this.snackBar.open(
      'Neuer Bienenschwarm!', 'Öffnen'
    );
    bar.onAction().subscribe(() => {
      this.router.navigate([notification.data.link]);
    });
  }

  public logout() {
    this.auth.signOut();
  }

  public ngOnInit() {
    this.setUpMessaging();
  }
}
