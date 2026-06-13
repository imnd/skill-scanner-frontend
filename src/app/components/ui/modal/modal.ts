import { Component, Input } from '@angular/core';
import { ValueControl } from '@/components/ui/value-control.base';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal extends ValueControl<boolean> {
  @Input() zIndex: number = 10000;
  @Input() title?: string;
  @Input() withBackIcon?: boolean = false;
  @Input() override value: boolean = false;

  isOpen = false
}
