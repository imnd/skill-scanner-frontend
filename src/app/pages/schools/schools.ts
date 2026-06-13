import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import type { Filters } from '@/app/utils/utils.types';
import { emptyFilters } from '@/app/utils/utils.consts';
import { schoolsFeature } from '@/store/schools/schools.reducer';
import { durationFeature } from '@/store/duration/duration.reducer';
import { educationFormatsFeature } from '@/store/education-formats/education-formats.reducer';
import { paymentTypesFeature } from '@/store/payment-types/payment-types.reducer';
import { SchoolsActions } from '@/store/schools/schools.actions';
import { DurationActions } from '@/store/duration/duration.actions';
import { PaymentTypesActions } from '@/store/payment-types/payment-types.actions';
import { EducationFormatsActions } from '@/store/education-formats/education-formats.actions';
import { CoursesCategoriesActions } from '@/store/courses-categories/courses-categories.actions';
import { SchoolsFilters } from '@/components/schools/schools-filters/schools-filters';
import { SchoolsList } from '@/components/schools/schools-list/schools-list';

@Component({
  imports: [ SchoolsFilters, SchoolsList ],
  templateUrl: './schools.html',
  styleUrl: './schools.scss',
})
export class Schools implements OnInit {
  filters: Filters = emptyFilters;

  private store   = inject(Store);
  schools     = this.store.selectSignal(schoolsFeature.selectAll);
  duration = this.store.selectSignal(durationFeature.selectAll);
  educationFormats = this.store.selectSignal(educationFormatsFeature.selectAll);
  paymentTypes = this.store.selectSignal(paymentTypesFeature.selectAll);

  async updateFilters(updatedFilters: unknown, needToRefreshPage = false) {
    if (needToRefreshPage) {
      this.filters.page = 1
    }
    if (updatedFilters) {
      this.filters = { ...this.filters, ...updatedFilters }
    }

    this.store.dispatch(SchoolsActions.getSchools({ filters: { ...this.filters } }));
  };

  async showMoreHandler(updatedFilters?: Filters) {
    this.filters = { ...this.filters, ...(updatedFilters || {}) }

    this.store.dispatch(SchoolsActions.loadMore({ filters: { ...this.filters } }));
  };

  ngOnInit() {
    this.store.dispatch(CoursesCategoriesActions.getCoursesCategories());
    this.store.dispatch(SchoolsActions.getSchools({ filters: {} }));
    this.store.dispatch(DurationActions.getDurations());
    this.store.dispatch(PaymentTypesActions.getPaymentTypes());
    this.store.dispatch(EducationFormatsActions.getEducationFormats());
  }
}
