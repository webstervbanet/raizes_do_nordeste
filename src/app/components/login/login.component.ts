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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LucideCookingPot,
    RouterLink,
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

  isLoading: boolean = false;
  errorMessage: string = '';

  authenticate = signal<boolean>(false);
  changePassword = signal<boolean>(false);

  form: FormGroup;
  formChangePassword: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.formChangePassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onLogin() {
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

    const sucesso = this.authService.login(dados);
    if (sucesso) {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }
}
