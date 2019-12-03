import { TestBed } from '@angular/core/testing';

import { AuthGuard1ServiceService } from './auth-guard1-service.service';

describe('AuthGuard1ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuard1ServiceService = TestBed.get(AuthGuard1ServiceService);
    expect(service).toBeTruthy();
  });
});
