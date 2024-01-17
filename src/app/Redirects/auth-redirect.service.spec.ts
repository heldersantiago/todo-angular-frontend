import { TestBed } from '@angular/core/testing';

import { AuthRedirectService } from './auth-redirect.service';

describe('AuthRedirectService', () => {
  let service: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
