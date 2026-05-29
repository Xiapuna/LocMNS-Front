import { inject, Injectable } from '@angular/core';
import { LoanCalendarDto } from '../app/models/loan-calendar-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  httpClient = inject(HttpClient);

  getEquipment(id: number) {
    return this.httpClient.get<Equipment>(`${environment.serverUrl}/equipment/${id}`);
  }

  getEquipmentLoans(id: number) {
    return this.httpClient.get<LoanCalendarDto[]>(`${environment.serverUrl}/equipment/${id}/loans`);
  }

  createLoan(equipmentId: number, start: Date, end: Date, appUserId: number) {
    const formatDate = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    return this.httpClient.post(`${environment.serverUrl}/loan`, {
      equipmentId: equipmentId,
      startDate: formatDate(start),
      endDate: formatDate(end),
      appUserId: appUserId,
    });
  }
}
