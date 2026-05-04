import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentCalendar } from '../equipment-calendar/equipment-calendar';
import { LoanCalendarDto } from '../../app/models/loan-calendar-dto';
import { CommonModule, DatePipe } from '@angular/common';
import { BookingDatesService } from '../../services/booking-dates.service';

@Component({
  selector: 'app-equipment-booking',
  imports: [EquipmentCalendar, DatePipe],
  templateUrl: './equipment-booking.html',
  styleUrl: './equipment-booking.css',
})
export class EquipmentBooking implements OnInit {
  route = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  router = inject(Router);
  equipment = signal<Equipment | null>(null);
  step = signal(1);
  reservations: LoanCalendarDto[] = [];
  booking = inject(BookingDatesService);

  goToStep(number: number) {
    console.log('STEP =', number);
    this.step.set(number);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.httpClient
        .get<Equipment>('http://localhost:8080/equipment/' + id)
        .subscribe((equipmentBooking) => this.equipment.set(equipmentBooking));

      this.httpClient
        .get<LoanCalendarDto[]>('http://localhost:8080/equipment/' + id + '/loans')
        .subscribe((data) => (this.reservations = data));
    });
  }

  onStartDateChange(event: any) {
    const date = event.target.valueAsDate;
    if (!date) return;

    date.setHours(0, 0, 0, 0);

    if (this.isDateBlocked(date)) {
      alert('Cette date n’est pas disponible.');
      event.target.value = '';
      return;
    }

    this.booking.setStart(date);

    // Si la date de fin est avant la date de début → reset
    if (this.booking.endDate() && this.booking.endDate()! < date) {
      this.booking.setEnd(null);
    }
  }

  onEndDateChange(event: any) {
    const date = event.target.valueAsDate;
    if (!date) return;

    date.setHours(0, 0, 0, 0);

    if (this.isDateBlocked(date)) {
      alert('Cette date n’est pas disponible.');
      event.target.value = '';
      return;
    }

    const start = this.booking.startDate();

    if (start && date < start) {
      alert('La date de fin doit être après la date de début.');
      event.target.value = '';
      return;
    }

    if (start && !this.isRangeValid(start, date)) {
      alert('La plage sélectionnée contient des dates indisponibles.');
      event.target.value = '';
      return;
    }

    this.booking.setEnd(date);
  }

  confirmReservation() {
    const equipmentId = this.equipment()!.id;
    const start = this.booking.startDate()!;
    const end = this.booking.endDate()!;

    this.httpClient
      .post('http://localhost:8080/loan', {
        equipmentId: equipmentId,
        startDate: start,
        endDate: end,
      })
      .subscribe(() => this.goToStep(3));
  }

  isDateBlocked(date: Date): boolean {
    if (!date) return false;

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return this.reservations.some((r) => {
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return d >= start && d <= end;
    });
  }

  isRangeValid(start: Date, end: Date): boolean {
    if (!start || !end) return true;

    const current = new Date(start);

    while (current <= end) {
      if (this.isDateBlocked(current)) return false;
      current.setDate(current.getDate() + 1);
    }

    return true;
  }
}
