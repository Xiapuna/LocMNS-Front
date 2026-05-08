import { inject, Injectable } from '@angular/core';
import { LoanCalendarDto } from '../app/models/loan-calendar-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  httpClient = inject(HttpClient);

  getEquipment(id: number) {
    return this.httpClient.get<Equipment>('http://localhost:8080/equipment/' + id);
  }

  getEquipmentLoans(id: number) {
    return this.httpClient.get<LoanCalendarDto[]>(
      'http://localhost:8080/equipment/' + id + '/loans',
    );
  }

  createLoan(equipmentId: number, start: Date, end: Date) {
    const formatDate = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    return this.httpClient.post('http://localhost:8080/loan', {
      equipment: { id: equipmentId },
      startDate: formatDate(start),
      endDate: formatDate(end),
    });
  }
}
