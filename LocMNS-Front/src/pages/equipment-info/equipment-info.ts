import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-equipment',
  imports: [RouterLink],
  templateUrl: './equipment-info.html',
  styleUrl: './equipment-info.css',
})
export class EquipmentInfo implements OnInit {
  route = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  equipment = signal<Equipment | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.httpClient
        .get<Equipment>('http://localhost:8080/equipment/' + id)
        .subscribe((equipmentInfo) => this.equipment.set(equipmentInfo));
    });
  }
}
