import { TestBed } from '@angular/core/testing';

import { BookingDatesService } from './booking-dates.service';

describe('BookingDate', () => {
  let service: BookingDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
