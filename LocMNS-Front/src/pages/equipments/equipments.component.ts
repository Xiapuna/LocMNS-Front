import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipments',
  imports: [RouterLink],
  templateUrl: './equipments.html',
  styleUrl: './equipments.css',
})
export class Equipments implements OnInit {
  equipments = signal<Equipment[]>([]);
  httpClient = inject(HttpClient);

  ngOnInit() {
    this.httpClient
      .get<Equipment[]>('http://localhost:8080/equipment/list')
      .subscribe((listEquipments) => {
        this.equipments.set(listEquipments);
      });
  }
}
