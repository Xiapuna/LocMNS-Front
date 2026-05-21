import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

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
  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    this.httpClient
      .get<Equipment[]>('http://localhost:8080/equipment/list')
      .subscribe((listEquipments) => {
        this.equipments.set(listEquipments);
      });
  }

  goToBooking(equipmentId: number) {
    const userId = this.userService.userId()!;
    this.router.navigate(['/equipment-booking', equipmentId, userId]);
  }
}
