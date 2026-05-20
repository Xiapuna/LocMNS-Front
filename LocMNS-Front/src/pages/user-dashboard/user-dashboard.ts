import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReservationTab } from '../../app/enums/reservation-tab';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  userService = inject(UserService);

  userId = this.userService.userId;
  userLoans = signal<Loan[] | null>(null);
  activeTab = signal<ReservationTab>(ReservationTab.Current);

  ReservationTab = ReservationTab;

  currentLoans = computed(() => {
    const loans = this.userLoans();

    if (!loans) return [];
    return this.userService.getCurrentLoans(loans);
  });

  upcomingLoans = computed(() => {
    const loans = this.userLoans();

    if (!loans) return [];
    return this.userService.getUpcomingLoans(loans);
  });

  pastLoans = computed(() => {
    const loans = this.userLoans();
    if (!loans) return [];

    return this.userService.getPastLoans(loans);
  });

  visibleLoans = computed(() => {
    switch (this.activeTab()) {
      case ReservationTab.Current:
        return this.currentLoans();
      case ReservationTab.Upcoming:
        return this.upcomingLoans();
      case ReservationTab.Past:
        return this.pastLoans();
      default:
        return [];
    }
  });

  ngOnInit(): void {
    this.userService.setUserId(3); // A changer quand l'authentification sera mise en place

    const id = this.userService.userId()!;

    this.userService.getUserLoans(id).subscribe((loanList) => {
      this.userLoans.set(loanList);
    });
  }
}
