import {Injectable} from '@angular/core';
import {BeehiveService} from './beehive.service';
import {BeekeeperService} from './beekeeper.service';
import {AngularFirestore} from '@angular/fire/firestore';


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

