import { Component } from '@angular/core';
import {
  LucideCookingPot,
  LucideHandPlatter,
  LucideListTodo,
  LucideShoppingCart,
  LucideUser,
} from '@lucide/angular';
import { MessageService } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LucideHandPlatter,
    LucideShoppingCart,
    LucideUser,
    LucideListTodo,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService],
})
export class HeaderComponent {}
