import { inject, Injectable, signal } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal<string | null>(null);
  type = signal<'info' | 'warning' | 'error' | 'valid'>('info');

  open(message: string, type: 'info' | 'warning' | 'error' | 'valid' = 'info') {
    this.message.set(message);
    this.type.set(type);

    setTimeout(() => this.message.set(null), 2000);
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class NotificationService {
//   snackBar = inject(MatSnackBar);
//   open(message: string, type: 'info' | 'warning' | 'error' | 'valid' = 'info') {
//     this.snackBar.open(message, undefined, {
//       duration: 400,
//       verticalPosition: 'top',
//       panelClass: type,
//     });
//   }
// }

// import { Injectable, signal } from '@angular/core';
