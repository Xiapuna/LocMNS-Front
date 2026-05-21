import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReservationTab } from '../../app/enums/reservation-tab';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
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
    const info = this.authService.jwtInfo();

    if (!info) {
      console.error("JWT non chargé, impossible de récupérer l'utilisateur");
      return;
    }

    const userId = info.id;

    this.userService.getUserLoans(userId).subscribe((loanList) => {
      this.userLoans.set(loanList);
    });
  }

  get userId() {
    return this.authService.jwtInfo()?.id ?? null;
  }
}
