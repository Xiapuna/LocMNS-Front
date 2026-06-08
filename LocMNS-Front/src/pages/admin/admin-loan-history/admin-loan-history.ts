import { Component, inject } from '@angular/core';
import { LoanAdminService } from '../../../services/loan-admin.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-loan-history',
  imports: [DatePipe],
  templateUrl: './admin-loan-history.html',
  styleUrl: './admin-loan-history.css',
})
export class AdminLoanHistory {
  admin = inject(LoanAdminService);
  route = inject(ActivatedRoute);

  ngOnInit(loan: any) {
    this.route.params.subscribe((parameter) => {
      const id = +parameter['id'];

      if (Number.isNaN(id)) {
        alert('ID non valide');
      } else {
        this.admin.loadLoanHistory(loan.id);
      }
    });
  }
}
