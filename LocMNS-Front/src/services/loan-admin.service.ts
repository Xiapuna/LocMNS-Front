import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoanAdminService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.serverUrl}/loans`;

  requestedExtensions = signal<Loan[]>([]);
  requestedReturns = signal<Loan[]>([]);
  allLoans = signal<Loan[]>([]);
  loanHistory = signal<LoanHistory[]>([]);

  loadRequestedExtensions() {
    this.httpClient
      .get<Loan[]>(`${this.baseUrl}?status=REQUESTED_EXTENSION`)
      .subscribe(this.requestedExtensions.set);
  }

  loadRequestedReturns() {
    this.httpClient
      .get<Loan[]>(`${this.baseUrl}?status=REQUESTED_RETURN`)
      .subscribe(this.requestedReturns.set);
  }

  loadLoanHistory(id: number) {
    this.httpClient
      .get<LoanHistory[]>(`${this.baseUrl}/${id}/history`)
      .subscribe(this.loanHistory.set);
  }

  extendLoan(id: number, newEndDate: string) {
    return this.httpClient.put(`${this.baseUrl}/${id}/extend`, { newEndDate });
  }

  validateReturn(id: number) {
    return this.httpClient.put(`${this.baseUrl}/${id}/return`, {});
  }

  loadAllLoans() {
    this.httpClient.get<Loan[]>(this.baseUrl).subscribe((loans) => {
      const statusOrder: Record<string, number> = {
        ONGOING: 1,
        REQUESTED_RETURN: 2,
        REQUESTED_EXTENSION: 3,
        VALIDATED: 4,
        RETURNED: 5,
      };

      const sorted = loans.sort((a, b) => {
        const statusDiff = statusOrder[a.loanStatus] - statusOrder[b.loanStatus];
        if (statusDiff !== 0) return statusDiff;

        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });

      this.allLoans.set(sorted);
    });
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

  getPendingLoans(loans: Loan[]): Loan[] {
    return loans.filter(
      (l) => l.loanStatus === 'REQUESTED_RETURN' || l.loanStatus === 'REQUESTED_EXTENSION',
    );
  }
}
