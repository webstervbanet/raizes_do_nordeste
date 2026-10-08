import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { MessageService } from 'primeng/api';

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

  private messageService = inject(MessageService);

  authenticated = signal(false);

  constructor() {
    this.authenticated.set(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }

  getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  login(data: { email: string; password: string }) {
    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(
      (u: any) => u.email === data.email && u.password === data.password,
    );

    if (usuario) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Login realizado com sucesso. Redirecionando...',
        life: 3000,
      });

      setTimeout(() => {
        this.setSession(usuario);
        this.router.navigate(['/home']);
      }, 3000);

      return true;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Erro!',
      detail: 'Usuário ou senha inválidos.',
      life: 3000,
    });

    return false;
  }

  register(data: any) {
    console.log('Dados de registro:', data);

    const usuarios = localStorage.getItem('usuarios')
      ? JSON.parse(localStorage.getItem('usuarios')!)
      : [];

    if (usuarios.some((u: any) => u.email === data.email)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Já existe um usuário cadastrado com este email.',
        life: 3000,
      });

      return false;
    }

    const novoUsuario = {
      nome: data.nome,
      email: data.email,
      password: data.password,
      cep: data.cep,
      rua: data.rua,
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Usuário cadastrado com sucesso.',
      life: 3000,
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);

    return true;
  }

  logout() {
    this.router.navigate(['/login'], { replaceUrl: true });
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    this.authenticated.set(false);
  }

  setSession(data: any) {
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('nome', data.nome);
    localStorage.setItem('email', data.email);
    this.authenticated.set(true);
  }

  getUsuarios(): any[] {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
  }
}
