import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent {
  pedidoService = inject(PedidoService);
}
