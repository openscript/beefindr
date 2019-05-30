import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

type ServiceWorkerEvent = any;

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  public promptEvent: ServiceWorkerEvent;

  constructor(swUpdate: SwUpdate) {
      swUpdate.available.subscribe(() =>  {
        if (window.confirm('Applikation aktualisieren?')) {
          window.location.reload();
        }
      });
      window.addEventListener('beforeinstallprompt', event => {
        this.promptEvent = event;
      });
  }

  public install() {
    if (this.promptEvent) {
      this.promptEvent.prompt();
    }
  }
}
