import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computed } from '@angular/core';
import { ReservationTab } from '../../app/enums/reservation-tab';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoanStatusLabelPipe } from '../../app/pipes/loan-status-label.pipe';

@Component({
  selector: 'app-user-reservations',
  imports: [RouterLink, CommonModule, LoanStatusLabelPipe],
  templateUrl: './user-reservations.html',
  styleUrl: './user-reservations.css',
})
export class UserReservations implements OnInit {
  userLoans = signal<Loan[] | null>(null);
  activeTab = signal<ReservationTab>(ReservationTab.Current);

  ReservationTab = ReservationTab;

  userService = inject(UserService);
  authService = inject(AuthService);

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

  pendingLoans = computed(() => {
    const loans = this.userLoans();
    if (!loans) return [];

    return loans.filter(
      (l) => l.loanStatus === 'REQUESTED_RETURN' || l.loanStatus === 'REQUESTED_EXTENSION',
    );
  });

  visibleLoans = computed(() => {
    switch (this.activeTab()) {
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

  ngOnInit(): void {
    this.loadReservations();
  }

  setTab(tab: ReservationTab) {
    this.activeTab.set(tab);
  }

  loadReservations() {
    const userId = this.authService.jwtInfo()?.id;

    if (!userId) {
      console.error('Impossible de récupérer l’ID utilisateur depuis le JWT');
      return;
    }

    this.userService.getUserLoans(userId).subscribe((loanList) => {
      this.userLoans.set(loanList);
    });
  }

  requestReturn(loanId: number) {
    this.userService.requestReturn(loanId).subscribe(() => {
      this.loadReservations();
    });
  }

  requestExtension(loanId: number) {
    this.userService.requestExtension(loanId).subscribe(() => {
      this.loadReservations();
    });
  }
}
