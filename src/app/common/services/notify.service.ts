import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {
  private messageSource = new Subject<Msg | null>();
  public message = this.messageSource.asObservable();

  public update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = { content, style };
    this.messageSource.next(msg);
  }

  public clear() {
    this.messageSource.next(null);
  }
}
