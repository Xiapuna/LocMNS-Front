import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoanAdminService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.serverUrl}/loans`;

  requestedExtensions = signal<Loan[]>([]);
  requestedReturns = signal<Loan[]>([]);
  allLoans = signal<Loan[]>([]);
  loanHistory = signal<LoanHistory[]>([]);

  loadRequestedExtensions() {
    this.http
      .get<Loan[]>(`${this.baseUrl}?status=REQUESTED_EXTENSION`)
      .subscribe(this.requestedExtensions.set);
  }

  loadRequestedReturns() {
    this.http
      .get<Loan[]>(`${this.baseUrl}?status=REQUESTED_RETURN`)
      .subscribe(this.requestedReturns.set);
  }

  loadLoanHistory(id: number) {
    this.http.get<LoanHistory[]>(`${this.baseUrl}/${id}/history`).subscribe(this.loanHistory.set);
  }

  extendLoan(id: number, newEndDate: string) {
    return this.http.put(`${this.baseUrl}/${id}/extend`, { newEndDate });
  }

  validateReturn(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/return`, {});
  }

  loadAllLoans() {
    this.http.get<Loan[]>(this.baseUrl).subscribe((loans) => {
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
}
