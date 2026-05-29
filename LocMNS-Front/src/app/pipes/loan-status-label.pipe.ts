import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanStatusLabel',
  standalone: true,
})
export class LoanStatusLabelPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'VALIDATED':
        return 'Validée';
      case 'ONGOING':
        return 'En cours';
      case 'REQUESTED_RETURN':
        return 'Retour demandé';
      case 'REQUESTED_EXTENSION':
        return 'Extension demandée';
      case 'RETURNED':
        return 'Terminée';
      default:
        return status;
    }
  }
}
