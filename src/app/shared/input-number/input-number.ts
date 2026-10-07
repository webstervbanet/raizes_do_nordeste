import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.html',
  imports: [FormsModule, ReactiveFormsModule, InputNumberModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputNumberComponent,
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() id = `}`;

  @Input() min?: number;
  @Input() max?: number;
  @Input() step = 1;

  @Input() minFractionDigits?: number;
  @Input() maxFractionDigits?: number;

  @Input() mode: 'decimal' | 'currency' = 'decimal';
  @Input() currency?: string;
  @Input() locale = 'pt-BR';

  @Input() label = '';
  @Input() required = false;
  @Input() invalid: boolean | null | undefined = null;
  @Input() errorMessage = '';
  @Input() size: 'large' | 'small' = 'small';

  value: number | null = null;
  disabled = false;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onInputChange(value: number | null): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
