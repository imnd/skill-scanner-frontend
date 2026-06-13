import { Store } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';
import { coursesCategoriesFeature } from '@/store/courses-categories/courses-categories.reducer';
import { CoursesCategoriesActions } from '@/store/courses-categories/courses-categories.actions';
import { schoolsFeature } from '@/store/schools/schools.reducer';
import { SchoolsActions } from '@/store/schools/schools.actions';
import { durationFeature } from '@/store/duration/duration.reducer';
import { DurationActions } from '@/store/duration/duration.actions';
import { paymentTypesFeature } from '@/store/payment-types/payment-types.reducer';
import { PaymentTypesActions } from '@/store/payment-types/payment-types.actions';
import { educationFormatsFeature } from '@/store/education-formats/education-formats.reducer';
import { EducationFormatsActions } from '@/store/education-formats/education-formats.actions';
import { coursesFeature } from '@/store/courses/courses.reducer';
import { CoursesActions } from '@/store/courses/courses.actions';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private store = inject(Store);

  categories = this.store.selectSignal(coursesCategoriesFeature.selectAll);
  courses     = this.store.selectSignal(coursesFeature.selectAll);
  coursesCount = this.store.selectSignal(coursesFeature.selectCoursesCount);
  duration = this.store.selectSignal(durationFeature.selectAll);
  educationFormats = this.store.selectSignal(educationFormatsFeature.selectAll);
  paymentTypes = this.store.selectSignal(paymentTypesFeature.selectAll);
  schools = this.store.selectSignal(schoolsFeature.selectAll);
  schoolsCount = this.store.selectSignal(schoolsFeature.selectSchoolsCount);

  loadAll(filters?: {
    schools?: {},
    courses?: {},
  }) {
    this.store.dispatch(CoursesCategoriesActions.getCoursesCategories());
    this.store.dispatch(CoursesActions.getCourses({ filters: filters?.courses || {} }));
    this.store.dispatch(SchoolsActions.getSchools({ filters: filters?.schools || {} }));
    this.store.dispatch(DurationActions.getDurations());
    this.store.dispatch(PaymentTypesActions.getPaymentTypes());
    this.store.dispatch(EducationFormatsActions.getEducationFormats());
  }
}
