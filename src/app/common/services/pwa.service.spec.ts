import { TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaService } from './pwa.service';
import { environment } from '../../../environments/environment';

describe('PwaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ]}));

  it('should be created', () => {
    const service: PwaService = TestBed.get(PwaService);
    expect(service).toBeTruthy();
  });
});
