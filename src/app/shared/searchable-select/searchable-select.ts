import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-searchable-select',
  imports: [SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './searchable-select.html',
  styleUrl: './searchable-select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchableSelect),
    },
  ],
})
export class SearchableSelect implements ControlValueAccessor {
  @Input() placeholder: string = 'Selecione';
  @Input({ required: true }) options: OptionsSelect[] = [];
  @Input() isInvalid: boolean | null | undefined = null;
  @Input() optionValue: string = 'value';
  @Input() emptyMessage: string = 'Nenhum resultado encontrado';
  @Input() emptyFilterMessage: string = 'Nenhum resultado encontrado';
  @Input() disabled: boolean = false;
  @Input() loadingSelect: boolean = false;
  @Input() small: boolean = false;
  @Input() size: 'small' | 'large' = 'small';
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number = 30;
  @Input() clearable: boolean = true;

  @Output() onchange = new EventEmitter<any>();
  @Output() filter = new EventEmitter<string>();

  @Input() value: any = null;

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

  clearFilter(select: any): void {
    select.resetFilter();
  }

  handleFilter(event: any): void {
    this.filter.emit(event.filter);
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
