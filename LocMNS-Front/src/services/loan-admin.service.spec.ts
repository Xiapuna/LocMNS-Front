import { TestBed } from '@angular/core/testing';

import { LoanAdminService } from './loan-admin.service';

describe('LoanAdminService', () => {
  let service: LoanAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
