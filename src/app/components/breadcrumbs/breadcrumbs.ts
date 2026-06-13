import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBreadcrumbs } from '@/store/breadcrumbs/breadcrumbs.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  imports: [ AsyncPipe ],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  private readonly store = inject(Store);
  breadcrumbs$ = this.store.select(selectBreadcrumbs);
}
