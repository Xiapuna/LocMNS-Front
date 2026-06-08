import { Component, inject } from '@angular/core';
import { LoanAdminService } from '../../../services/loan-admin.service';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  admin = inject(LoanAdminService);

  loans = this.admin.allLoans;
  router = inject(Router);

  ngOnInit() {
    this.admin.loadAllLoans();
  }

  loanHistory(id: number) {
    this.admin.loadLoanHistory(id);
    this.router.navigate(['/admin-loan-history', id]);
  }
}
