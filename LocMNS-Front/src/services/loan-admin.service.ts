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

  extendLoan(id: number, newEndDate: string) {
    return this.http.put(`${this.baseUrl}/${id}/extend`, { newEndDate });
  }

  validateReturn(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/return`, {});
  }

  getAllLoans() {
    return this.http.get<Loan[]>(`${this.baseUrl}`);
  }

  loadAllLoans() {
    this.getAllLoans().subscribe((loans) => this.allLoans.set(loans));
  }
}
