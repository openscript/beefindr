import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  @Input() public username?: string;
  @Output() public logout = new EventEmitter<void>();

  public constructor() { }

  public ngOnInit() {
  }

  public onLogout() {
    this.logout.emit();
  }
}
