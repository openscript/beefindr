import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {AngularFirestore} from '@angular/fire/firestore';
import {BeehiveService} from './beehive.service';
import {BeekeeperService} from './beekeeper.service';
import {Injectable} from '@angular/core';
import {MessagingService} from './messaging.service';


/**
 * In order to reuse services in Firebase Cloud Functions, they are implemented
 * without the @Injectable decorator in their individual files.
 * Use their injectable counterparts collected here to inject them
 * into Angular components.
 */

@Injectable()
export class InjectableBeehiveService extends BeehiveService {
  public constructor(protected fireStore: AngularFirestore) {
    super(fireStore);
  }
}

@Injectable()
export class InjectableBeekeeperService extends BeekeeperService {
  public constructor(protected fireStore: AngularFirestore) {
    super(fireStore);
  }
}

@Injectable()
export class InjectableMessagingService extends MessagingService {
  public constructor(
    protected beekeeperService: InjectableBeekeeperService,
    protected angularFireAuth: AngularFireAuth,
    protected angularFireMessaging: AngularFireMessaging
  ) {
    super(beekeeperService, angularFireAuth, angularFireMessaging);
  }
}
