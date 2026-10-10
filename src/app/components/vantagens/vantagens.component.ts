import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from '../../shared/button/button';
import { PedidoService } from '../../services/pedido.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vantagens',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './vantagens.component.html',
  styleUrls: ['./vantagens.component.css'],
})
export class VantagensComponent {
  pedidoService = inject(PedidoService);
  messageService = inject(MessageService);

  recompensas = [
    { nome: '🥤 Cajuína gelada', pontos: 50 },
    { nome: '🍮 Pudim de tapioca', pontos: 80 },
    { nome: '🌽 Pamonha', pontos: 100 },
    { nome: '🧀 Tapioca com queijo coalho', pontos: 150 },
    { nome: '🥟 Pastel de carne de sol', pontos: 180 },
    { nome: '🍰 Bolo de rolo', pontos: 200 },
    { nome: '🥩 Carne de sol com macaxeira', pontos: 300 },
    { nome: '🍲 Baião de dois', pontos: 350 },
    { nome: '🍛 Escondidinho de carne de sol', pontos: 400 },
    { nome: '🍖 Sarapatel', pontos: 450 },
    { nome: '🍗 Galinha à cabidela', pontos: 500 },
    { nome: '🍽️ Combo nordestino completo', pontos: 700 },
  ];

  resgatar(item: any) {
    this.pedidoService.resgatarRecompensa(item);
    this.messageService.add({
      severity: 'success',
      summary: 'Resgatado com sucesso!',
      detail: `Seu próximo pedido virá acompanhado de ${item.nome}`,
      life: 5000,
    });
  }
}
