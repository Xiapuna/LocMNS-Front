import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoanAdminService } from '../../../services/loan-admin.service';

@Component({
  selector: 'app-admin-requests',
  imports: [FormsModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css',
})
export class AdminRequests {
  admin = inject(LoanAdminService);

  ngOnInit() {
    this.admin.loadRequestedExtensions();
    this.admin.loadRequestedReturns();
  }

  extend(loan: any) {
    this.admin.extendLoan(loan.id, loan.newEndDate).subscribe(() => {
      this.admin.loadRequestedExtensions();
    });
  }

  validateReturn(loan: any) {
    this.admin.validateReturn(loan.id).subscribe(() => {
      this.admin.loadRequestedReturns();
    });
  }
}
