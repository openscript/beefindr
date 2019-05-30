import { Injectable } from '@angular/core';
import { KeeperModel } from '../models/keeper';
import { BasePersistenceService } from './base-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class KeeperPersistenceService extends BasePersistenceService<KeeperModel> {
  protected getCollectionName() {
    return 'beekeeper';
  }
}
