import { Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export class ValueControl<T = undefined> {
  // value/model binding
  @Input() value: T | undefined = undefined
  get model(): T | undefined {
    return this.value;
  }
  @Output() valueChange = new EventEmitter<T>();
  @Output() input = new EventEmitter<T>();
  set model(val: T) {
    this.valueChange.emit(val);
    this.input.emit(val);
  }
  onValueChange(val: any) {
    this.model = val;
  }
}
