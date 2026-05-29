import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-equipments',
  imports: [RouterLink],
  templateUrl: './equipments.html',
  styleUrl: './equipments.css',
})
export class Equipments implements OnInit {
  equipment = signal<Equipment | null>(null);
  equipments = signal<Equipment[]>([]);
  httpClient = inject(HttpClient);
  router = inject(Router);

  ngOnInit() {
    this.httpClient
      .get<Equipment[]>(`${environment.serverUrl}/equipment/list`)
      .subscribe((listEquipments) => {
        this.equipments.set(listEquipments);
      });
  }

  goToBooking(equipmentId: number) {
    this.router.navigate(['/equipment-booking', equipmentId]);
  }
}
