import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);

  getUserLoans(id: number) {
    return this.httpClient.get<Loan[]>('http://localhost:8080/appuser/' + id + '/loans');
  }
}
