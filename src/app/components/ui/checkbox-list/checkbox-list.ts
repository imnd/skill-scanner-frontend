import { Component, Input } from '@angular/core';
import { ValueControl } from '@/components/ui/value-control.base';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import type { Id } from '@/app/utils/utils.types';

@Component({
  selector: 'app-checkbox-list',
  imports: [ Checkbox ],
  templateUrl: './checkbox-list.html',
  styleUrl: './checkbox-list.scss',
})
export class CheckboxList<
  TValueKey extends string,
  TTextKey extends string
> extends ValueControl<Id[]> {
  @Input() itemValuePropName: TValueKey = 'value' as TValueKey;
  @Input() itemTextPropName: TTextKey = 'text' as TTextKey;
  @Input({ required: true }) items!: (Record<TValueKey, Id> & Record<TTextKey, string>)[];
  @Input() visibleItemsSize: number = 6;

  isHiddenItemsShowed = false;

  get visibleItems () {
    return this.items.slice(0, this.visibleItemsSize)
  }
  get hiddenItems () {
    return this.items.slice(this.visibleItemsSize)
  }
}
