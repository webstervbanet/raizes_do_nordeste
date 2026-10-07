import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.css',
  imports: [DatePickerModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() size: 'small' | 'large' = 'small';
  @Input() showTime: boolean = false;
  @Input() clearable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() invalid: boolean | null | undefined = null;

  value: any = null;

  @Output() onchange = new EventEmitter<any>();

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(value: any): void {
    this.value = value;

    // notifica Angular Forms
    this.onChange(value);
    this.onTouched();

    // notifica consumidores do componente
    this.onchange.emit(value);
  }
}
