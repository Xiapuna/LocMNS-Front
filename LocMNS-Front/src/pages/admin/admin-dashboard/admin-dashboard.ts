import { Component, inject } from '@angular/core';
import { LoanAdminService } from '../../../services/loan-admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  admin = inject(LoanAdminService);

  loans = this.admin.allLoans;

  ngOnInit() {
    this.admin.loadAllLoans();
  }
}
