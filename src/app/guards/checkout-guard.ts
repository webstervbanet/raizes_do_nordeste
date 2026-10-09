import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CarrinhoService } from '../services/carrinho.service';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const carrinhoService = inject(CarrinhoService);

  const isAuthenticated = authService.isAuthenticated();

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    // Redireciona para /login e mantém a URL original como parâmetro de retorno
    console.log('Usuário não autenticado');
    return false; // Bloqueia o acesso
  }

  // Se o usuário já estiver autenticado e tentar acessar a página de checkout sem nenhum produto
  if (isAuthenticated && carrinhoService.getQuantidade() <= 0 && state.url === '/checkout') {
    router.navigate(['/home'], { replaceUrl: true });
    return false; // Bloqueia o acesso ao checkout
  }

  return true; // Permite o acesso se o usuário estiver com produtos no carrinho e autenticado
};
