import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { EquipmentImagePipe } from '../../app/pipes/equipment-image.pipe';

@Component({
  selector: 'app-info-equipment',
  imports: [RouterLink, EquipmentImagePipe],
  templateUrl: './equipment-info.html',
  styleUrl: './equipment-info.css',
})
export class EquipmentInfo implements OnInit {
  route = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  router = inject(Router);
  equipment = signal<Equipment | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const equipmentId = +params['equipmentId'];

      this.httpClient
        .get<Equipment>(`${environment.serverUrl}/equipment/${equipmentId}`)
        .subscribe((equipmentInfo) => this.equipment.set(equipmentInfo));
    });
  }

  goToBooking() {
    const equipmentId = this.equipment()!.id;
    this.router.navigate(['/equipment-booking', equipmentId]);
  }
}
