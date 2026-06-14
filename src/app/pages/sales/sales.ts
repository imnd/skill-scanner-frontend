import { Component, inject, OnInit } from '@angular/core';
import { DateTimeService } from '@/services/date-time';
import { Store } from '@ngrx/store';
import { salesFeature } from '@/store/sales/sales.reducer';
import { SalesActions } from '@/store/sales/sales.actions';

@Component({
  selector: 'app-sales',
  imports: [],
  templateUrl: './sales.html',
  styleUrl: './sales.scss'
})
export class Sales implements OnInit {
  readonly dateTimeService = inject(DateTimeService);
  private store = inject(Store);
  sales = this.store.selectSignal(salesFeature.selectAll);

  ngOnInit() {
    this.store.dispatch(SalesActions.getSales());
  }
}
