import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-confirm-dialog',
  imports: [DialogModule, Button, ConfirmDialogModule],
  templateUrl: './confirmDialog.component.html',
})
export class ConfirmDialog {
  @Input() showDialog: boolean = false;
  @Input({ required: true }) title = 'Titulo';
  @Input({ required: true }) message = 'Descrição';
  @Input() btnClose = 'Cancelar';
  @Input({ required: true }) btnConfirmLabel = 'Confirmar';
  @Input() isLoading = false;
  @Input() confirmSeverity: 'primary' | 'secondary' | 'success' | 'info' | 'help' | 'danger' =
    'danger';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClick() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
