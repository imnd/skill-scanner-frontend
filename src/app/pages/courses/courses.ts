import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBreadcrumbs } from '@/store/breadcrumbs/breadcrumbs.actions';
import { CoursesList } from '@/components/courses/courses-list/courses-list';

@Component({
  imports: [ CoursesList ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
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
