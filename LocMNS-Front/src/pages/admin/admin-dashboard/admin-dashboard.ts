import { Component, computed, inject, signal } from '@angular/core';
import { LoanAdminService } from '../../../services/loan-admin.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReservationTab } from '../../../app/enums/reservation-tab';
import { LoanStatusLabelPipe } from '../../../app/pipes/loan-status-label.pipe';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, LoanStatusLabelPipe, CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  adminService = inject(LoanAdminService);

  loans = this.adminService.allLoans;
  router = inject(Router);

  ReservationTab = ReservationTab;
  activeTab = signal<ReservationTab>(ReservationTab.Current);

  ngOnInit() {
    this.adminService.loadAllLoans();
  }

  loanHistory(id: number) {
    this.adminService.loadLoanHistory(id);
    this.router.navigate(['/admin-loan-history', id]);
  }

  currentLoans = computed(() => {
    return this.adminService.getCurrentLoans(this.adminService.allLoans());
  });

  upcomingLoans = computed(() => {
    return this.adminService.getUpcomingLoans(this.adminService.allLoans());
  });

  pastLoans = computed(() => {
    return this.adminService.getPastLoans(this.adminService.allLoans());
  });

  pendingLoans = computed(() => {
    return this.adminService.getPastLoans(this.adminService.allLoans());
  });

  visibleLoans = computed(() => {
    switch (this.activeTab()) {
      case ReservationTab.All:
        return this.adminService.allLoans();
      case ReservationTab.Current:
        return this.currentLoans();
      case ReservationTab.Upcoming:
        return this.upcomingLoans();
      case ReservationTab.Past:
        return this.pastLoans();
      case ReservationTab.Pending:
        return this.pendingLoans();
      default:
        return [];
    }
  });

  setTab(tab: ReservationTab) {
    this.activeTab.set(tab);
  }

  openHistory(id: number) {
    this.router.navigate(['/admin-loan-history', id]);
  }
}
