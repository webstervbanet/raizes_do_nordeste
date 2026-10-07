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
import { version } from '../../../../package.json';
import { LucideCookingPot } from '@lucide/angular';
import { InputComponent } from '../../shared/input/input';

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

  nome_usuario: string = '';
  senha_usuario: string = '';
  email_usuario: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = false;
  showLoadingOverlay: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  authenticate = signal<boolean>(false);
  changePassword = signal<boolean>(false);

  version = version;
  formChangePassword: FormGroup;

  constructor() {
    this.formChangePassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onLogin(event: Event) {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSuccess = false;

    if (!this.nome_usuario || !this.senha_usuario) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.nome_usuario, this.senha_usuario).subscribe({
      next: (response) => {
        // Salvar dados do usuário se necessário
        if (response && response.token) {
          //Setando dados da sessão
          this.authService.setSession(response);

          // Mostrar efeito de sucesso
          this.isLoading = false;
          this.isSuccess = true;
          this.successMessage = 'Login realizado com sucesso!';
          this.showLoadingOverlay = true;

          // Aguardar um momento para mostrar o efeito de sucesso
          // Redirecionar para a tela home
          this.router.navigate(['/inicio']);
        } else if (response && response.emailToken == true) {
          this.authenticate.set(true);
        } else {
          // Resposta sem token - tratar como erro
          console.warn('Login retornou sem token:', response);
          this.errorMessage = 'Resposta de login inválida. Tente novamente.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.isLoading = false;
        this.isSuccess = false;
        this.showLoadingOverlay = false;
        // Tratar diferentes tipos de erro
        if (error.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else if (error.status === 404) {
          this.errorMessage = 'Serviço não encontrado. Tente novamente mais tarde.';
        } else if (error.status === 500) {
          this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        } else if (error.status === 0) {
          this.errorMessage = 'Erro de conexão. Verifique sua internet.';
        } else {
          // Verificar se há mensagem de erro específica da API
          const apiMessage = error.error?.message || error.error?.Message;
          this.errorMessage = apiMessage || 'Erro no login. Verifique suas credenciais.';
        }
      },
    });
  }
}
