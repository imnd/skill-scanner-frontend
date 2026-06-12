import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Id } from '@/app/types/utils.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [ FormsModule ],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  @Input() text: string = '';
  @Input() id: Id = true;

  // value/model binding
  @Input() value: any[] = [];
  get model(): any[] {
    return this.value;
  }
  @Output() valueChange = new EventEmitter<any[]>();
  set model(val: any[]) {
    this.valueChange.emit(val);
  }

  get isActive() {
    return this.value.includes(this.id);
  };
}
