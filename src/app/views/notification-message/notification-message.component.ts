import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../common/services/notify.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent implements OnInit {
  private subscription: Subscription;
  message: any;

  constructor(public notify: NotifyService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.subscription = this.notify.msg.subscribe(message => {
        this.message = message;
        if (message) {
        this.snackBar.open(message.content, 'Close', {
          duration: 20000,
        });
    }});
}



}
