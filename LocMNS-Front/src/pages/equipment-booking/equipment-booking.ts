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
    this.booking.setStart(new Date(event.target.value));
  }

  onEndDateChange(event: any) {
    this.booking.setEnd(new Date(event.target.value));
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
}
