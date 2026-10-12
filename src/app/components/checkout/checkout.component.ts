import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { Button } from '../../shared/button/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskComponent } from '../../shared/input-mask/input-mask';
import { InputComponent } from '../../shared/input/input';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { LucideLock, LucideShieldKeyhole } from '@lucide/angular';
import { PedidoService } from '../../services/pedido.service';
import { CheckboxComponent } from '../../shared/checkbox/checkbox';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    ReactiveFormsModule,
    InputMaskComponent,
    InputComponent,
    ProgressBarModule,
    LucideLock,
    LucideShieldKeyhole,
    RouterLink,
    CheckboxComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  carrinhoService = inject(CarrinhoService);
  formBuilder = inject(FormBuilder);
  messageService = inject(MessageService);
  pedidoService = inject(PedidoService);

  private cdr = inject(ChangeDetectorRef);

  pagamento = signal<boolean>(false);
  processandoPedido = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  form: FormGroup;

  value: number = 0;
  statusPedido = 'Recebido';
  mensagemPedido = '';
  etapaAtual = 0;

  private intervaloPedido: ReturnType<typeof setInterval> | undefined;

  constructor() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required]],
      validade: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      termosAceitos: [false, [Validators.requiredTrue]],
    });
  }

  selecionarPagamento() {
    this.pagamento.set(true);
  }

  concluirPagamento() {
    const dados = this.form.value;

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'info',
        summary: 'Atenção!',
        detail: 'Preencha todos os campos obrigatórios.',
      });
      return;
    }

    const pedido = {
      produtos: this.carrinhoService.produtos(),
      total: this.carrinhoService.getTotalFinal(),
      status: 'Concluído',
    };

    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.processandoPedido.set(true);
      this.carrinhoService.resetar();
      this.acompanharPedido();
    }, 3000);
    this.pedidoService.adicionarPedido(pedido);
  }

  acompanharPedido() {
    if (this.intervaloPedido) {
      clearInterval(this.intervaloPedido);
    }

    const etapas = [
      {
        status: 'Recebido',
        value: 0,
        mensagem: 'Recebemos seu pedido! Em breve, iniciaremos o preparo.',
      },
      {
        status: 'Em andamento',
        value: 33,
        mensagem: 'Seu pedido está sendo preparado com todo o cuidado!',
      },
      {
        status: 'A caminho',
        value: 66,
        mensagem: 'Seu pedido está pronto e a caminho! Prepare-se para recebê-lo.',
      },
      {
        status: 'Concluído',
        value: 100,
        mensagem: 'Pedido concluído! Esperamos que você aproveite sua refeição.',
      },
    ];

    this.etapaAtual = 0;
    this.value = 0;
    this.statusPedido = 'Recebido';
    this.mensagemPedido = etapas[0].mensagem;

    this.intervaloPedido = setInterval(() => {
      if (this.etapaAtual < etapas.length - 1) {
        this.etapaAtual++;

        this.statusPedido = etapas[this.etapaAtual].status;
        this.value = etapas[this.etapaAtual].value;
        this.mensagemPedido = etapas[this.etapaAtual].mensagem;

        this.cdr.detectChanges();
      } else {
        clearInterval(this.intervaloPedido);
        this.intervaloPedido = undefined;
      }
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervaloPedido) {
      clearInterval(this.intervaloPedido);
    }
  }
}
