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

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.admin.loadLoanHistory(id);
  }
}
