import { Component, Input } from '@angular/core';
import type { Id } from '@/app/utils/utils.types';
import { FormsModule } from '@angular/forms';
import { ValueControl } from '@/components/ui/value-control.base';

@Component({
  selector: 'app-checkbox',
  imports: [ FormsModule ],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox extends ValueControl<Id[]> {
  @Input() id: Id = true;
  @Input() text: string = '';
  @Input() override value: Id[] = [];

  get isActive() {
    return this.value.includes(this.id);
  };
}
