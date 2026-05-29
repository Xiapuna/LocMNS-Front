import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);
  userId = signal<number | null>(null);

  normalizeLoans(loans: Loan[]): Loan[] {
    return loans.map((loan) => {
      const start = new Date(loan.startDate);
      const end = new Date(loan.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return {
        ...loan,
        startDate: start,
        endDate: end,
      };
    });
  }

  setUserId(id: number) {
    this.userId.set(id);
  }

  getUserLoans(id: number) {
    return this.httpClient
      .get<Loan[]>(`${environment.serverUrl}/appuser/${id}/loans`)
      .pipe(map((loans) => this.normalizeLoans(loans)));
  }

  getCurrentLoans(loans: Loan[]): Loan[] {
    const today = this.today();
    return loans.filter((loan) => loan.startDate <= today && today <= loan.endDate);
  }

  getUpcomingLoans(loans: Loan[]): Loan[] {
    const today = this.today();
    return loans.filter((loan) => loan.startDate > today);
  }

  getPastLoans(loans: Loan[]): Loan[] {
    const today = this.today();
    return loans.filter((loan) => loan.endDate < today);
  }

  private today(): Date {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    return day;
  }
}
