import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

type ChangePassword = {
  userName: string;
  password: string;
  passwordConfirmar: string;
  mensagem: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'api/Account/LogOn';
  private router = inject(Router);
  private http = inject(HttpClient);
  private jwtService = inject(JwtService);
  authenticated = signal(false);

  constructor() {
    this.authenticated.set(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token && !this.jwtService.isTokenExpired(token);
  }

  getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  login(userName: string, password: string, language: string = 'pt-BR'): Observable<any> {
    const loginData = {
      userName,
      password,
      language,
    };

    return this.http.post(this.apiUrl, loginData);
  }

  logout() {
    this.router.navigate(['/login'], { replaceUrl: true });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('pessoa');
    this.authenticated.set(false);
  }

  setSession(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.usuario);
    localStorage.setItem('pessoa', response.pessoa);
    this.authenticated.set(true);
  }
}
