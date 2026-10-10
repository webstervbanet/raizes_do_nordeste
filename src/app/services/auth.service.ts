import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

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
      life: 5000,
    });

    return false;
  }

  register(data: any) {
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

    usuarios.push(data);
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
    localStorage.removeItem('unidadeSelecionada');
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

  getInfosUsuarioLogado() {
    const usuarios = this.getUsuarios();
    const email = localStorage.getItem('email');
    const usuario = usuarios.find((u: any) => u.email === email);

    return usuario;
  }
}
