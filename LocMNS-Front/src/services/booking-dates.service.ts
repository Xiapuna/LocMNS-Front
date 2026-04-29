import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingDatesService {
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);

  setStart(date: Date | null) {
    this.startDate.set(date);
  }

  setEnd(date: Date | null) {
    this.endDate.set(date);
  }

  reset() {
    this.startDate.set(null);
    this.endDate.set(null);
  }
}
