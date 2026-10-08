import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, Button, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent {
  carrinhoService = inject(CarrinhoService);
}
