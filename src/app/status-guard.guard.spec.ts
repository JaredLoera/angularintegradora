import { TestBed } from '@angular/core/testing';

import { StatusGuardGuard } from './status-guard.guard';

describe('StatusGuardGuard', () => {
  let guard: StatusGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StatusGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
