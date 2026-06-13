import { Component, Input } from '@angular/core';
import { CheckboxGroup } from '@/components/ui/checkbox-group/checkbox-group';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { ValueControl } from '@/components/ui/value-control.base';

@Component({
  selector: 'app-multiple-select',
  imports: [ CheckboxGroup, Checkbox ],
  templateUrl: './multiple-select.html',
  styleUrl: './multiple-select.scss',
})
export class MultipleSelect extends ValueControl<any[]> {
  @Input() items: any[] = [];
  @Input() itemValuePropName: string = 'value';
  @Input() itemTitlePropName: string = 'title';
  @Input() childValuePropName: string = 'value';
  @Input() childTextPropName: string = 'text';
  @Input() childrenPropName: string = 'items';
  @Input() withChildren?: boolean = false;
  @Input({ required: true }) selectTitle!: string;
  @Input() override value: any[] = [];

  isActive = false;

  selectAllOrClear () {
    if (this.doesModelIncludeValues) {
      this.model = this.model!.filter(item => !this.allValues.includes(item))
    } else {
      this.model = [
        ...this.value,
        ...this.allValues.filter(value => !this.model!.includes(value))
      ]
    }
  }

  get allValues(): any[] {
    return this.withChildren
      ? this.items?.reduce((result, item) => [
        ...result,
        item[this.itemValuePropName],
        ...item[this.childrenPropName].map((c: any) => c[this.childValuePropName])
      ], [])
      : this.items.map(item => item[this.itemValuePropName]);
  }

  get doesModelIncludeValues(): boolean {
    return this.model!.some(item => this.allValues.includes(item));
  }
}
