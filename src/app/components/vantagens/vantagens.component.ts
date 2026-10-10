import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-vantagens',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './vantagens.component.html',
  styleUrls: ['./vantagens.component.css'],
})
export class VantagensComponent {}
