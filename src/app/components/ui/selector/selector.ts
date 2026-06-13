import { Component, EventEmitter, Input, Output, ElementRef, inject, OnInit } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { CheckboxGroup } from '@/components/ui/checkbox-group/checkbox-group';
import type { Id } from '@/app/utils/utils.types';
import { ValueControl } from '@/components/ui/value-control.base';

@Component({
  selector: 'app-selector',
  imports: [ Modal, Checkbox, CheckboxGroup ],
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector extends ValueControl<Id[]> implements OnInit {
  @Input({ required: true }) items!: any[];
  @Input({ required: true }) title!: string;
  @Input() withChildren: boolean = false;
  @Input() itemValuePropName: string = 'value';
  @Input() itemTextPropName: string = 'text';
  @Input() childrenPropName: string = 'items';
  @Input() childValuePropName: string = 'value';
  @Input() childTextPropName: string = 'text';

  isItemsShowed = false
  parentHeight = 0

  @Input() override value: Id[] = [];
  override get model(): Id[] {
    return this.value;
  }
  get modalComponent () {
    return this.withChildren ? 'CheckboxGroup' : 'Checkbox'
  }
  get allValues () {
    return this.withChildren
      ? this.items.reduce((result, item) => [...result, item[this.itemValuePropName], ...item[this.childrenPropName].map((child: Record<string, object>) => child[this.childValuePropName])], [])
      : this.items.map(i => i[this.itemValuePropName])
  };
  get selectedItemsCount () {
    return this.model.filter(value => this.allValues.includes(value)).length
  }

  private el = inject(ElementRef);
  ngOnInit() {
    this.parentHeight = this.el.nativeElement.parentElement.offsetHeight;
  }
}
