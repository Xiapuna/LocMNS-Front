import { Component, inject } from '@angular/core';
import { LoanAdminService } from '../../../services/loan-admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
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
