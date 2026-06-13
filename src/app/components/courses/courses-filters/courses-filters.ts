import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

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

import type { Filters, Sorting, AvailableSorting } from '@/app/utils/utils.types';
import { emptyFilters } from '@/app/utils/utils.consts';
import { FiltersService } from '@/services/filters.service';
import { CheckboxGroup } from '@/components/ui/checkbox-group/checkbox-group';

@Component({
  selector: 'app-courses-filters',
  imports: [ MultipleSelect, Select, Selector, Modal, FormsModule ],
  templateUrl: './courses-filters.html',
  styleUrl: './courses-filters.scss',
})
export class CoursesFilters implements OnInit {
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

  filtersService = inject(FiltersService);
  ngOnInit() {
    this.filtersService.loadAll();
  }
}
