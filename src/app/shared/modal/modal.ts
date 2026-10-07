import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-modal',
  imports: [DialogModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() title = 'Modal';
  @Input() width: number = 500;
  @Input() showModal: boolean = false;
  @Input() loadingModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  fecharModal() {
    this.close.emit();
  }
}
