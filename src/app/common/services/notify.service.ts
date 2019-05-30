import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/// Notify users about errors and other helpful stuff
export interface Message {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {
  private messageSource = new Subject<Message | null>();
  public message = this.messageSource.asObservable();

  public update(content: string, style: 'error' | 'info' | 'success') {
    const message: Message = { content, style };
    this.messageSource.next(message);
  }

  public clear() {
    this.messageSource.next(null);
  }
}
