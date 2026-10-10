import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule, Toast } from 'primeng/toast';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ToastModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('raizes_do_nordeste');

  private authService = inject(AuthService);

  isAuthenticated = this.authService.authenticated;

  ngOnInit() {}
}
