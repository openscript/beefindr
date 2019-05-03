import {Component, OnInit} from '@angular/core';
import {Message} from '../models/message.model';
import {MessageService} from '../services/message.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-hello-world',
  templateUrl: '../templates/hello-world.component.html'
})
export class HelloWorldComponent implements OnInit {

  public messages: Message[] = [];

  public messageForm: FormGroup = new FormGroup({
    messageField: new FormControl('')
  });

  public constructor(private messageService: MessageService) {}


  /**
   * Called when the user submits the form.
   * Takes the value of the form field, creates a Message-instance with it
   * and passes it to the messageService in order to create the instance
   * in the database.
   */
  public submit() {
    this.messageService
      .createItem(new Message({msg: this.messageForm.get('messageField').value}));
  }

  /**
   * Deletion of an instance is pretty simple.
   */
  public deleteMessage(message: Message) {
    this.messageService.deleteItem(message);
  }

  /**
   * This is called when the component has been initialized and is
   * ready to be used. We subscribe to the ``getSortedMessages`` Observable.
   * Whenever the contents in the ``messages`` database-collection change
   * on the sever, we will get notified and we can update our messages array
   * with the latest data.
   */
  public ngOnInit(): void {
    this.messageService.getSortedMessages().subscribe(messages => {
      this.messages = messages;
    });
  }
}
