import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBreadcrumbs } from '@/store/breadcrumbs/breadcrumbs.actions';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(setBreadcrumbs({
      breadcrumbs: [
        { title: 'Курсы', href: '/courses' },
      ]
    }));
  }
}
