import { Component, Input, Output, EventEmitter } from '@angular/core';

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
export class Select {
  @Input({ required: true }) selectTitle!: string;
  @Input() itemValuePropName: string = 'value';
  @Input() itemTitlePropName: string = 'title';
  @Input() items: any[] = [];

  isActive = false;

  // value/model binding
  @Input() value?: Value;
  get model(): Value | undefined {
    return this.value;
  }
  @Output() valueChange = new EventEmitter<Value>();
  set model(val: Value) {
    this.valueChange.emit(val);
  }

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
