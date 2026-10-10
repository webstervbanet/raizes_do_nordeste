import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [FormsModule, InputMaskModule],
  templateUrl: './input-mask.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    },
  ],
})
export class InputMaskComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() mask = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;

  @Input() invalid: boolean | null | undefined = null;
  @Input() errorMessage = '';

  @Input() size: 'small' | 'large' = 'large';

  @Input() autoClear = true;
  @Input() unmask = false;
  @Input() slotChar = '_';

  value = '';

  protected onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string | null): void {
    this.value = value ?? '';
    this.onChange(this.value);
  }
}
