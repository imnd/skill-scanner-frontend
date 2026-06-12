import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { salesFeature } from '@/store/sales/sales.reducer';
import { SalesActions } from '@/store/sales/sales.actions';

@Component({
  selector: 'app-sales-list',
  imports: [],
  templateUrl: './sales-list.html',
  styleUrl: './sales-list.scss',
})
export class SalesList implements OnInit {
  private store   = inject(Store);
  sales     = this.store.selectSignal(salesFeature.selectAll);

  ngOnInit() {
    this.store.dispatch(SalesActions.getSales());
  }
}
