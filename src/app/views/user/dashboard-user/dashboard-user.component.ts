import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from '../../../common/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/common/services/messaging.service';
import { KeeperPersistenceService } from 'src/app/common/services/persistence/keeper-persistence.service';


interface BeeHiveMessage {
  data: {
    link: string
  };
}

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss'],
  providers: [AngularFireMessaging, MessagingService]
})
export class DashboardUserComponent implements OnInit {
  public constructor(
    private keeperPersistence: KeeperPersistenceService,
    private messagingService: MessagingService,
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
      .subscribe((notification) => {
        this.handleNewNotification(notification);
      });

    // Get the current user and its paired BeeKeeper and request permissions
    // for notifications, then start listening for messages.
    //
    // IMPORTANT NOTE: In order to avoid infinite token refreshes when being logged in
    // on multiple instances with the same user, we're using take(1) to only fetch
    // keepers list once. This could be improved in the future by allowing multiple messaging tokens
    // to account for the use case where the user logs in from different devices.
    this.auth.user.subscribe(user => {
      this.keeperPersistence.find(ref => ref.where('userUID', '==', user.uid))
        .pipe(take(1))
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
      void this.router.navigate([notification.data.link]);
    });
  }

  public logout() {
    this.auth.signOut();
  }

  public ngOnInit() {
    this.setUpMessaging();
  }
}
