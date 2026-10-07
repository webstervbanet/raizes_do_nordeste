import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'lg' | 'ex-lg' = 'sm';
  @Input() btnWidth: number | null = null;
  @Input() isDisabled: boolean = false;
  @Input() name: string = ''; // recebe o texto do botão
  @Input() isLoading: boolean = false;
  @Input() icon: string = '';
  @Input() iconLeft: string = '';
  @Input() class: string = '';

  @Output() clicked = new EventEmitter<void>(); // emite o clique

  onClick() {
    this.clicked.emit(); //Chama a função passada onde chamou o botao
  }
}
