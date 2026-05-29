import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from '../environments/environment';

type JwtInfo = { sub: string; role: string; id: number };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly jwtInfo = signal<JwtInfo | null>(null);
  httpClient = inject(HttpClient);
  router = inject(Router);

  isAdmin = computed(() => this.jwtInfo()?.role === 'ADMIN');

  constructor() {
    this.decodeJwt();
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post(`${environment.serverUrl}/login`, credentials, {
        responseType: 'text',
      })
      .pipe(
        tap((jwt) => {
          localStorage.setItem('jwt', jwt);
          this.decodeJwt();
        }),
        // map(() => this.jwtInfo()), // renvoie le signal décodé
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.jwtInfo.set(null);
    this.router.navigate(['/login']);
  }

  decodeJwt() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const jwtParts = jwt.split('.');
      const bodyBase64 = jwtParts[1];
      const bodyJson = atob(bodyBase64);
      const body = JSON.parse(bodyJson);
      this.jwtInfo.set(body);
    }
  }
}
