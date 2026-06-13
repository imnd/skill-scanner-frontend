import { Component, Input } from '@angular/core';
import { ValueControl } from '@/components/ui/value-control.base';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination extends ValueControl<number> {
  @Input({ required: true }) pagesCount!: number;
  @Input({ required: true }) override value: number = 1;
}
