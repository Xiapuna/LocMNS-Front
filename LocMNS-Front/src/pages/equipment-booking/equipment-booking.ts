import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipment-booking',
  imports: [],
  standalone: true,
  templateUrl: './equipment-booking.html',
  styleUrl: './equipment-booking.css',
})
export class EquipmentBooking implements OnInit {
  route = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  equipment = signal<Equipment | null>(null);
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);
  step = signal(1);

  constructor(private router: Router) {}

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
    });
  }

  onStartDateChange(event: any) {
    this.startDate.set(event.target.value);
  }

  onEndDateChange(event: any) {
    this.endDate.set(event.target.value);
  }

  confirmReservation() {
    const equipmentId = this.equipment()!.id;
    const start = this.startDate()!;
    const end = this.endDate()!;

    this.httpClient
      .post('http://localhost:8080/loan', {
        equipmentId: equipmentId,
        startDate: start,
        endDate: end,
      })
      .subscribe(() => this.goToStep(3));
  }
}
