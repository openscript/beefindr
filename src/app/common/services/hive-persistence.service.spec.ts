import { TestBed } from '@angular/core/testing';

import { HivePersistenceService } from './hive-persistence.service';

describe('HivePersistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HivePersistenceService = TestBed.get(HivePersistenceService);
    expect(service).toBeTruthy();
  });
});
