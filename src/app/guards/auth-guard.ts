import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    // Redireciona para /login e mantém a URL original como parâmetro de retorno
    console.log('Usuário não autenticado');
    return false; // Bloqueia o acesso
  }

  // Se o usuário já estiver autenticado e tentar acessar a página de login
  if (isAuthenticated && state.url === '/login') {
    console.log('Usuário já autenticado');
    router.navigate(['/home']);
    return false; // Bloqueia o acesso ao login para usuários autenticados
  }

  return true; // Permite o acesso se o usuário estiver autenticado
};
