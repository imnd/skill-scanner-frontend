import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { coursesCategoriesFeature } from '@/store/courses-categories/courses-categories.reducer';
import { CoursesCategoriesActions } from '@/store/courses-categories/courses-categories.actions';
import { CoursesCategory } from '@/store/courses-categories/courses-categories.model';
import { setBreadcrumbs } from '@/store/breadcrumbs/breadcrumbs.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  templateUrl: './courses-categories.html',
  styleUrl: './courses-categories.scss',
})
export class CoursesCategories implements OnInit {
  private route = inject(ActivatedRoute);
  slug = this.route.snapshot.paramMap.get('slug');

  private store   = inject(Store);
  categories = this.store.selectSignal(coursesCategoriesFeature.selectAll);
  topCategories = this.store.selectSignal(coursesCategoriesFeature.selectTopCategories);

  unfoldedCategories: (string | number)[] = []
  foldUnfoldCategory (category: CoursesCategory) {
    if (this.isCategoryFolded(category)) {
      this.unfoldedCategories.push(category.id)
    } else {
      this.unfoldedCategories = this.unfoldedCategories.filter(
        id => id !== category.id
      )
    }
  }

  isCategoryFolded (category: CoursesCategory) {
    return !this.unfoldedCategories.includes(category.id)
  }

  ngOnInit() {
    this.store.dispatch(setBreadcrumbs({
      breadcrumbs: [
        { title: 'Категории', href: '/courses-categories' },
      ]
    }));

    this.store.dispatch(CoursesCategoriesActions.getCoursesCategories());
    this.store.dispatch(CoursesCategoriesActions.getTopCategories({ limit: 10 }));
  }
}
