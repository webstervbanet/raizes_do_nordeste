import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LucideCookingPot } from '@lucide/angular';
import { InputComponent } from '../../shared/input/input';
import { CheckboxComponent } from '../../shared/checkbox/checkbox';
import { MessageService } from 'primeng/api';
import { InputMaskComponent } from '../../shared/input-mask/input-mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LucideCookingPot,
    RouterLink,
    InputComponent,
    CheckboxComponent,
    InputMaskComponent,
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

  isLoading: boolean = false;

  authenticate = signal<boolean>(false);
  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      cep: ['', [Validators.required, Validators.minLength(3)]],
      rua: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required, Validators.minLength(3)]],
      bairro: ['', [Validators.required, Validators.minLength(3)]],
      cidade: ['', [Validators.required, Validators.minLength(3)]],
      estado: ['', [Validators.required, Validators.minLength(2)]],
      termosAceitos: [false, [Validators.requiredTrue]],
    });
  }

  onRegister(event: Event) {
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

    if (dados.password !== dados.confirmPassword) {
      this.form.get('confirmPassword')?.setErrors({ mismatch: true });

      this.messageService.add({
        severity: 'info',
        summary: 'Atenção!',
        detail: 'As senhas devem ser iguais.',
      });
      return;
    }

    const sucesso = this.authService.register(dados);

    if (sucesso) {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }
}
