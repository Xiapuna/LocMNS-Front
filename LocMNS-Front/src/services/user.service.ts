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

  setUserId(id: number) {
    this.userId.set(id);
  }

  getUserLoans(id: number) {
    return this.httpClient.get<Loan[]>(`${environment.serverUrl}/appuser/${id}/loans`);
  }

  private toDate(dateString: string): Date {
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private today(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  getCurrentLoans(loans: Loan[]): Loan[] {
    const today = this.today();

    return loans.filter((l) => {
      const start = this.toDate(l.startDate);
      const end = this.toDate(l.endDate);

      return (
        start <= today &&
        today <= end &&
        (l.loanStatus === 'VALIDATED' || l.loanStatus === 'ONGOING')
      );
    });
  }

  getUpcomingLoans(loans: Loan[]): Loan[] {
    const today = this.today();

    return loans.filter((l) => this.toDate(l.startDate) > today && l.loanStatus === 'VALIDATED');
  }

  getPastLoans(loans: Loan[]): Loan[] {
    return loans.filter((l) => l.loanStatus === 'RETURNED');
  }

  requestReturn(loanId: number) {
    return this.httpClient.post(`${environment.serverUrl}/loan/${loanId}/request-return`, {});
  }

  requestExtension(loanId: number) {
    return this.httpClient.post(`${environment.serverUrl}/loan/${loanId}/request-extension`, {});
  }
}
