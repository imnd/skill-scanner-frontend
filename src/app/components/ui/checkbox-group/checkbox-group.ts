import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import type { Id } from '@/app/types/utils.types';

@Component({
  selector: 'app-checkbox-group',
  imports: [ Checkbox ],
  templateUrl: './checkbox-group.html',
  styleUrl: './checkbox-group.scss',
})
export class CheckboxGroup implements OnInit {
  @Input({ required: true }) id!: Id;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) items!: Record<string, string>[];
  @Input() itemValuePropName: string = 'value';
  @Input() itemTextPropName: string = 'text';

  isToggled: boolean = false;

  // value/model binding
  @Input() value: Id[] = [];
  get model(): Id[] {
    return this.value;
  }
  @Output() valueChange = new EventEmitter<Id[]>();
  @Output() input = new EventEmitter<any[]>();
  set model(val: Id[]) {
    this.valueChange.emit(val);
    this.input.emit(val);
  }

  get isParentChecked () {
    return this.value.includes(this.id)
  }

  parentChangeState (newModelValue: Id[]) {
    this.isToggled = newModelValue.includes(this.id)

    const allValues = [...this.items.map(item => item[this.itemValuePropName]), this.id]
    const modelWithoutAllValues = this.value.filter(item => !allValues.includes(item))

    if (this.isToggled) {
      this.input.emit(this.isToggled ? [...modelWithoutAllValues, ...allValues] : modelWithoutAllValues);
    }
  }

  ngOnInit() {
    if (this.value.includes(this.id)) {
      this.isToggled = true
    }
  }
}
