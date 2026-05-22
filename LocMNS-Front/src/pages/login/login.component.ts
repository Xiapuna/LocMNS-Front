import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  // , MatInputModule, MatButtonModule
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  authService = inject(AuthService);
  router = inject(Router);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    if (this.formulaire.valid) {
      this.authService
        .login(this.formulaire.value as { email: string; password: string })
        .subscribe({
          next: () => {
            this.notification.open('Connexion réussie', 'valid');
            this.router.navigate(['/user-dashboard']);
          },
          error: () => {
            this.notification.open('Mauvais login / mot de passe', 'error');
          },
        });
    }
  }
}
