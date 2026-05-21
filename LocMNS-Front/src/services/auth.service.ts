import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

type JwtInfo = { sub: string; role: string; id: number };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly jwtInfo = signal<JwtInfo | null>(null);
  httpClient = inject(HttpClient);

  constructor() {
    this.decodeJwt();
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post('http://localhost:8080/login', credentials, {
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
