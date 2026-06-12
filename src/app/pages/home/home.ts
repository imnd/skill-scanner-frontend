import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesCategoriesActions } from '@/store/courses-categories/courses-categories.actions';
import { selectTopCategories } from '@/store/courses-categories/courses-categories.reducer';
import { CoursesList } from '@/components/courses/courses-list/courses-list';
import { ReviewsList } from '@/components/reviews/reviews-list/reviews-list';
import { SalesList } from '@/components/sales-list/sales-list';

@Component({
  imports: [ CoursesList, ReviewsList, SalesList ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private readonly store = inject(Store);
  title = 'Онлайн-школы';
  limit = 9;

  // Выбираем данные как сигнал (Signal)
  topCategories = this.store.selectSignal(selectTopCategories);
  ngOnInit() {
    // Диспатчим экшен для получения топ-категорий с бэкенда при загрузке компонента
    this.store.dispatch(CoursesCategoriesActions.getTopCategories({ limit: this.limit }));
  }
}
