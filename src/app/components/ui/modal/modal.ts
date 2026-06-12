import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() zIndex: number = 10000;
  @Input() title?: string;
  @Input() withBackIcon?: boolean = false;

  // value/model binding
  @Input() value: boolean = false;
  get model(): boolean {
    return this.value;
  }
  @Output() valueChange = new EventEmitter<boolean>();
  set model(val: boolean) {
    this.valueChange.emit(val);
  }

  isOpen = false
}
