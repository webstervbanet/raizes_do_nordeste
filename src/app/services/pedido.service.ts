import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  authService = inject(AuthService);
  pontos = 10;

  adicionarPedido(pedido: any) {
    const usuario = this.authService.getInfosUsuarioLogado();
    if (!usuario) {
      return false;
    }

    usuario.pontos ??= 0;
    usuario.pedidos ??= [];

    usuario.pedidos.push({
      ...pedido,
      data: new Date().toISOString(),
    });

    usuario.pontos += this.pontos;

    const usuarios = this.authService.getUsuarios();
    const usuariosAtualizados = usuarios.map((u: any) => (u.email === usuario.email ? usuario : u));

    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));

    return true;
  }

  getPedidos() {
    const usuario = this.authService.getInfosUsuarioLogado();

    if (!usuario) {
      return [];
    }

    return usuario.pedidos ?? [];
  }

  getPontos(): number {
    const usuario = this.authService.getInfosUsuarioLogado();

    return usuario?.pontos ?? 0;
  }

  resgatarRecompensa(recompensa: any) {
    const usuario = this.authService.getInfosUsuarioLogado();

    if (!usuario || (usuario.pontos ?? 0) < recompensa.pontos) {
      return false;
    }

    usuario.pontos -= recompensa.pontos;

    const usuarios = this.authService.getUsuarios();
    const usuariosAtualizados = usuarios.map((u: any) => (u.email === usuario.email ? usuario : u));
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    return true;
  }
}
