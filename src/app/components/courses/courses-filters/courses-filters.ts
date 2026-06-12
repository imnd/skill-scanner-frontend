import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import type { PrimaryKey } from '@/app/types/utils.types';
import { schoolsFeature } from '@/store/schools/schools.reducer';
import { coursesFeature } from '@/store/courses/courses.reducer';
import { coursesCategoriesFeature } from '@/store/courses-categories/courses-categories.reducer';
import { paymentTypesFeature } from '@/store/payment-types/payment-types.reducer';
import { durationFeature } from '@/store/duration/duration.reducer';
import { educationFormatsFeature } from '@/store/education-formats/education-formats.reducer';
import { Modal } from '@/components/ui/modal/modal';
import { MultipleSelect } from '@/components/ui/multiple-select/multiple-select';
import { Selector } from '@/components/ui/selector/selector';
import { Select } from '@/components/ui/select/select';

type Sorting = {
  field: string
  type: 'ASC' | 'DESC'
}

export type Filters = {
  selectedCategories: PrimaryKey[]
  selectedSchools: PrimaryKey[]
  selectedDuration: PrimaryKey[]
  selectedPaymentTypes: PrimaryKey[]
  selectedEducationFormats: PrimaryKey[]

  sorting?: Sorting | null
  searchString: string
  limit: number
  page: number
}

export const emptyFilters: Filters = {
  selectedCategories: [],
  selectedSchools: [],
  selectedDuration: [],
  selectedPaymentTypes: [],
  selectedEducationFormats: [],
  sorting: null,
  searchString: '',
  limit: 20,
  page: 1,
}

type AvailableSorting = {
  value: Sorting,
  title: string,
}

@Component({
  selector: 'app-courses-filters',
  imports: [ MultipleSelect, Select, Selector, Modal, FormsModule ],
  templateUrl: './courses-filters.html',
  styleUrl: './courses-filters.scss',
})
export class CoursesFilters {
  doesSearchFieldHaveVisibleModifier = false
  isShowModal = false

  sorting: Sorting | undefined
  availableSortings: AvailableSorting[] = [
    {
      value: { field: 'courseName', type: 'ASC' },
      title: 'По названию курса A-Z'
    }, {
      value: { field: 'courseName', type: 'DESC' },
      title: 'По названию курса Z-A'
    }, {
      value: { field: 'schoolName', type: 'ASC' },
      title: 'По названию школы A-Z'
    }, {
      value: { field: 'schoolName', type: 'DESC' },
      title: 'По названию школы Z-A'
    }, {
      value: { field: 'price', type: 'ASC' },
      title: 'По возрастанию цены'
    }, {
      value: { field: 'price', type: 'DESC' },
      title: 'По убыванию цены'
    }, {
      value: { field: 'duration', type: 'ASC' },
      title: 'По возрастанию длительности'
    }, {
      value: { field: 'duration', type: 'DESC' },
      title: 'По убыванию длительности'
    },
  ]

  get selectedFiltersCount() {
    return this.filters.selectedCategories.length
      + this.filters.selectedSchools.length
      + this.filters.selectedDuration.length
      + this.filters.selectedPaymentTypes.length
      + this.filters.selectedEducationFormats.length
  };

  @Input() filters: Filters = emptyFilters;
  @Output() filtersChanged = new EventEmitter<Filters>();
  filterChangedHandler() {
    this.filtersChanged.emit(this.filters);
  }

  resetFilters() {
    this.filters = emptyFilters;
    this.filterChangedHandler();
  }

  handleSorting(sortField: string) {
    if (!this.sorting || this.sorting.field !== sortField) {
      this.sorting = this.availableSortings.find(
             sort => sort.value?.field === sortField
          && sort.value.type === 'ASC'
      )?.value
    } else if (this.sorting.type === 'ASC') {
      this.sorting = this.availableSortings.find(
             sort => sort.value.field === sortField
          && sort.value.type === 'DESC'
      )?.value
    } else if (this.sorting.type === 'DESC') {
      this.sorting = undefined
    }

    this.filters.page = 1
    this.filterChangedHandler()
  }

  private store   = inject(Store);
  categories = this.store.selectSignal(coursesCategoriesFeature.selectAll);
  courses     = this.store.selectSignal(coursesFeature.selectAll);
  schools     = this.store.selectSignal(schoolsFeature.selectAll);
  duration = this.store.selectSignal(durationFeature.selectAll);
  paymentTypes = this.store.selectSignal(paymentTypesFeature.selectAll);
  educationFormats = this.store.selectSignal(educationFormatsFeature.selectAll);
  coursesCount = this.store.selectSignal(coursesFeature.selectCoursesCount);
}
