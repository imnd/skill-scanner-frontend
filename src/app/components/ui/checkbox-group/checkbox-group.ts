import { Component, Input, OnInit } from '@angular/core';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { ValueControl } from '@/components/ui/value-control.base';
import { Id } from '@/app/utils/utils.types';

@Component({
  selector: 'app-checkbox-group',
  imports: [ Checkbox ],
  templateUrl: './checkbox-group.html',
  styleUrl: './checkbox-group.scss',
})
export class CheckboxGroup<
  TValueKey extends string,
  TTextKey extends string
> extends ValueControl<Id[]> implements OnInit {
  @Input() itemValuePropName: TValueKey = 'value' as TValueKey;
  @Input() itemTextPropName: TTextKey = 'text' as TTextKey;
  @Input() override value: Id[] = [];
  @Input({ required: true }) id!: Id;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) items!: (Record<TValueKey, Id> & Record<TTextKey, string>)[];

  isToggled: boolean = false;

  get isParentChecked () {
    return this.value.includes(this.id)
  }

  parentChangeState (newModelValue: Id[]) {
    this.model = newModelValue;

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
