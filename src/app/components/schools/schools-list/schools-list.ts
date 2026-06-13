import { Component, EventEmitter, inject, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounce } from 'throttle-debounce'

import { SchoolCard } from '@/components/schools/school-card/school-card';
import { Pagination } from '@/components/ui/pagination/pagination';
import { Select } from '@/components/ui/select/select';
import type { ScalarFilters, Sorting } from '@/app/utils/utils.types';
import { coursesFeature } from '@/store/courses/courses.reducer';
import { CoursesActions } from '@/store/courses/courses.actions';
import { schoolsFeature } from '@/store/schools/schools.reducer';
import { SchoolsActions } from '@/store/schools/schools.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schools-list',
  imports: [ SchoolCard, Pagination, Select, FormsModule ],
  templateUrl: './schools-list.html',
  styleUrl: './schools-list.scss',
  host: {
    style: 'display: contents;'
  },
})
export class SchoolsList implements OnInit, OnChanges {
  @Input({ required: true }) currentPage!: number;

  page = 1;
  searchString = '';
  limit = 20;
  availableLimits = [20, 50, 100];
  sorting: Sorting = {
    field: '',
    type: 'ASC'
  };
  availableSortings = [
    { value: { field: 'rating', type: 'DESC' }, title: 'Сначала высокий рейтинг' },
    { value: { field: 'reviewsCount', type: 'DESC' }, title: 'По количеству отзывов' },
    { value: { field: 'schoolName', type: 'ASC' }, title: 'По названию A-Z' },
    { value: { field: 'schoolName', type: 'DESC' }, title: 'По названию Z-A' },
  ];

  get pagesCount () {
    return Math.ceil(this.schoolsCount() / this.limit)
  }

  @Output() showMore = new EventEmitter<unknown>();
  handleShowMore() {
    this.showMore.emit({
      page: ++this.page,
    });
  }

  @Output() updateFilters = new EventEmitter<ScalarFilters>();
  loadData (changedPropName?: unknown) {
    if (changedPropName !== 'page') {
      this.page = 1
    }
    this.updateFilters.emit({
      page: this.page,
      sorting: this.sorting,
      searchString: this.searchString,
      limit: this.limit,
    });
  }

  debounceLoadData = debounce(800, (changedPropName: unknown) => {
    this.loadData(changedPropName)
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPage']) {
      this.page = changes['currentPage'].currentValue;
    }
  }

  private store   = inject(Store);
  courses = this.store.selectSignal(coursesFeature.selectAll);
  schools = this.store.selectSignal(schoolsFeature.selectAll);
  schoolsCount = this.store.selectSignal(schoolsFeature.selectSchoolsCount);

  ngOnInit() {
    this.store.dispatch(CoursesActions.getCourses({ filters: {} }));
    this.store.dispatch(SchoolsActions.getSchools({ filters: {} }));
  }

  @Output() updatedFilters = new EventEmitter<ScalarFilters>();
}
