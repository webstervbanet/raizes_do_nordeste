import { Component, inject } from '@angular/core';
import {
  LucideCookingPot,
  LucideHandPlatter,
  LucideListTodo,
  LucideShoppingCart,
  LucideSquareArrowRightExit,
  LucideUser,
} from '@lucide/angular';
import { MessageService } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LucideHandPlatter,
    LucideShoppingCart,
    LucideUser,
    LucideListTodo,
    LucideSquareArrowRightExit,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService],
})
export class HeaderComponent {
  carrinhoService = inject(CarrinhoService);
  authService = inject(AuthService);

  sair() {
    this.authService.logout();
  }
}
