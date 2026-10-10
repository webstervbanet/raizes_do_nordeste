import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../shared/input/input';
import { MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, CommonModule, ReactiveFormsModule, InputComponent, Button],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

  isLoading: boolean = false;

  form: FormGroup;
  usuario = this.authService.getInfosUsuarioLogado();

  constructor() {
    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, [Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      cep: [this.usuario.cep, [Validators.required, Validators.minLength(3)]],
      rua: [this.usuario.rua, [Validators.required, Validators.minLength(3)]],
      numero: [this.usuario.numero, [Validators.required, Validators.minLength(3)]],
      bairro: [this.usuario.bairro, [Validators.required, Validators.minLength(3)]],
      cidade: [this.usuario.cidade, [Validators.required, Validators.minLength(3)]],
      estado: [this.usuario.estado, [Validators.required, Validators.minLength(3)]],
    });
  }
}
