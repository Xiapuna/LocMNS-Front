import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { computed } from '@angular/core';
import { ReservationTab } from '../../app/enums/reservation-tab';

@Component({
  selector: 'app-user-reservations',
  imports: [RouterLink],
  templateUrl: './user-reservations.html',
  styleUrl: './user-reservations.css',
})
export class UserReservations implements OnInit {
  userLoans = signal<Loan[] | null>(null);
  activeTab = signal<ReservationTab>(ReservationTab.Current);

  ReservationTab = ReservationTab;

  userService = inject(UserService);

  currentLoans = computed(() => {
    const loans = this.userLoans();

    if (!loans) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return loans.filter((loan) => {
      const start = new Date(loan.startDate);
      const end = new Date(loan.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return start <= today && today <= end;
    });
  });

  upcomingLoans = computed(() => {
    const loans = this.userLoans();
    if (!loans) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return loans.filter((loan) => {
      const start = new Date(loan.startDate);
      start.setHours(0, 0, 0, 0);
      return start > today;
    });
  });

  pastLoans = computed(() => {
    const loans = this.userLoans();
    if (!loans) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return loans.filter((loan) => {
      const end = new Date(loan.endDate);
      end.setHours(0, 0, 0, 0);
      return end < today;
    });
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
    const userId = 2; // A changer quand l'authentification sera mise en place

    this.userService.getUserLoans(userId).subscribe((loanList) => {
      this.userLoans.set(loanList);
    });
  }

  setTab(tab: ReservationTab) {
    this.activeTab.set(tab);
  }
}
