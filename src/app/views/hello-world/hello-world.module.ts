import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {HelloWorldComponent} from './components/messages.component';
import {MessageService} from './services/message.service';


/**
 * Hello World Module, serves as a proof of concept for
 * basic CRUD functionality via FireStore.
 */
@NgModule({
  declarations: [
    HelloWorldComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HelloWorldComponent
  ],
  providers: [
    MessageService
  ],
  bootstrap: [HelloWorldComponent]
})
export class HelloWorldModule {}
