import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoanHistory } from './admin-loan-history';

describe('AdminLoanHistory', () => {
  let component: AdminLoanHistory;
  let fixture: ComponentFixture<AdminLoanHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoanHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLoanHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
