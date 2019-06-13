import { TestBed } from '@angular/core/testing';

import { TheInterceptorService } from './the-interceptor.service';

describe('TheInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheInterceptorService = TestBed.get(TheInterceptorService);
    expect(service).toBeTruthy();
  });
});
