import { Component, Input } from '@angular/core';
import { ValueControl } from '@/components/ui/value-control.base';

type Value = number | string | object;

@Component({
  selector: 'app-select',
  host: {
    style: 'display: contents;'
  },
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select extends ValueControl<Value> {
  @Input({ required: true }) selectTitle!: string;
  @Input() itemValuePropName: string = 'value';
  @Input() itemTitlePropName: string = 'title';
  @Input() items: any[] = [];

  isActive = false;

  get title () {
    if (this.value) {
      let selected = this.items.find(item => item[this.itemValuePropName] === this.value)
      if (selected !== undefined) {
        return selected[this.itemTitlePropName]
      }
    }
    return this.selectTitle
  }
}
