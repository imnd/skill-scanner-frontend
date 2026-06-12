import { Router, ActivatedRoute } from '@angular/router';
import { debounce } from 'throttle-debounce'

import { Store } from '@ngrx/store';
import { Component, Input, inject, OnInit } from '@angular/core';

import { CoursesFilters, Filters, emptyFilters } from '@/components/courses/courses-filters/courses-filters';
import { CourseCard } from '@/components/courses/course-card/course-card';

import type { PrimaryKey } from '@/app/types/utils.types';
import { SeoData, SeoService } from '@/services/seo.service';

import { School } from '@/store/schools/schools.model';
import { schoolsFeature } from '@/store/schools/schools.reducer';
import { SchoolsActions } from '@/store/schools/schools.actions';
import { selectSchoolById } from '@/store/schools/schools.reducer';

import { coursesFeature } from '@/store/courses/courses.reducer';
import { CoursesActions } from '@/store/courses/courses.actions';

import { CoursesCategory } from '@/store/courses-categories/courses-categories.model';
import { coursesCategoriesFeature } from '@/store/courses-categories/courses-categories.reducer';
import { CoursesCategoriesActions } from '@/store/courses-categories/courses-categories.actions';

import { Duration } from '@/store/duration/duration.model';
import { DurationActions } from '@/store/duration/duration.actions';
import { durationFeature } from '@/store/duration/duration.reducer';

import { PaymentType } from '@/store/payment-types/payment-types.model';
import { PaymentTypesActions } from '@/store/payment-types/payment-types.actions';
import { paymentTypesFeature } from '@/store/payment-types/payment-types.reducer';

import { EducationFormat } from '@/store/education-formats/education-formats.model';
import { EducationFormatsActions } from '@/store/education-formats/education-formats.actions';
import { educationFormatsFeature } from '@/store/education-formats/education-formats.reducer';

@Component({
  selector: 'app-courses-list',
  imports: [ CoursesFilters, CourseCard ],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList implements OnInit {
  @Input() path: string = '';

  categorySlug!: string;

  filters: Filters = emptyFilters;
  seo?: SeoData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
  ) {}

  private store   = inject(Store);
  schools     = this.store.selectSignal(schoolsFeature.selectAll);
  courses     = this.store.selectSignal(coursesFeature.selectAll);
  coursesCount = this.store.selectSignal(coursesFeature.selectCoursesCount);
  categories = this.store.selectSignal(coursesCategoriesFeature.selectAll);
  paymentTypes = this.store.selectSignal(paymentTypesFeature.selectAll);
  duration = this.store.selectSignal(durationFeature.selectAll);
  educationFormats = this.store.selectSignal(educationFormatsFeature.selectAll);

  getCourses() {
    this.store.dispatch(CoursesActions.getCourses({ filters: this.filters }));
  }

  getSchoolById(id: PrimaryKey) {
    return this.store.selectSignal(selectSchoolById(id))() || null;
  }

  debounceGetCourses = debounce(500, async () => this.getCourses())

  setCategories (category?: CoursesCategory) {
    if (!category) {
      return
    }

    this.filters.selectedCategories.push(category.id, ...category.subCategories?.map(sc => sc.id) || [])
  }

  checkQueryParams () {
    const query = this.route.snapshot.queryParams
    const categoriesSlugsString = query['category']
    if (categoriesSlugsString) {
      const categoriesSlugs = categoriesSlugsString.split(',')

      this.filters.selectedCategories = this.categories().reduce(
        (result: PrimaryKey[], category) => {
          if (categoriesSlugs.includes(category.slug)) {
            result.push(category.id)
          }

          if (category.subCategories) {
            result.push(...category.subCategories.filter(sc => categoriesSlugs.includes(sc.slug)).map(sc => sc.id))
          }

          return result
        },
        []
      )
    }

    const schoolsSlugsString = query['school']
    if (schoolsSlugsString) {
      const schoolsSlugs = schoolsSlugsString.split(',')

      this.filters.selectedSchools = this.schools().reduce((result: PrimaryKey[], school) => {
        if (schoolsSlugs.includes(school.slug)) {
          result.push(school.id)
        }

        return result
      }, [])
    }

    const durationSlugsString = query['duration']
    if (durationSlugsString) {
      const durationSlugs = durationSlugsString.split(',')

      this.filters.selectedDuration = this.duration().reduce((result: PrimaryKey[], duration: Duration) => {
        if (durationSlugs.includes(duration.slug)) {
          result.push(duration.id)
        }

        return result
      }, [])
    }

    const paymentTypesSlugsString = query['paymenttype']
    if (paymentTypesSlugsString) {
      const paymentTypesSlugs = paymentTypesSlugsString.split(',')

      this.filters.selectedPaymentTypes = this.paymentTypes().reduce((result: PrimaryKey[], paymentType: PaymentType) => {
        if (paymentTypesSlugs.includes(paymentType.slug)) {
          result.push(paymentType.id)
        }

        return result
      }, [])
    }

    const educationFormatsSlugsString = query['educationformat']
    if (educationFormatsSlugsString) {
      const educationFormatsSlugs = educationFormatsSlugsString.split(',')

      this.filters.selectedEducationFormats = this.educationFormats().reduce((result: PrimaryKey[], educationFormat: EducationFormat) => {
        if (educationFormatsSlugs.includes(educationFormat.slug)) {
          result.push(educationFormat.id)
        }

        return result
      }, [])
    }
  }

  updateUrl () {
    const query: {
      category?: PrimaryKey
      school?: PrimaryKey
      duration?: PrimaryKey
      paymenttype?: PrimaryKey
      educationformat?: PrimaryKey
    } = {}

    if (this.filters.selectedCategories.length > 0) {
      const categoriesIds = this.categories().map(
        c => {
          if (c.subCategories) {
            return [c.id, ...c.subCategories.map(sc => sc.id)].sort().toString()
          }
          return null;
        }
      )

      if (this.filters.selectedCategories.length === 1) {
        query.category = this.filters.selectedCategories[0]
      } else {
        query.category = this.categories()
          .reduce(
            (result: PrimaryKey[], category) => {
              if (this.filters.selectedCategories.includes(category.id)) {
                result.push(category.slug)
              }

              if (category.subCategories) {
                result.push(
                  ...category.subCategories
                    .filter(
                      subCat => this.filters.selectedCategories.includes(subCat.id)
                    )
                    .map(subCat => subCat.slug)
                )
              }

              return result
            },
            []
          )
          .join(',')
      }
    }

    if (this.filters.selectedSchools.length > 0) {
      query.school = this.schools()
        .reduce((result: PrimaryKey[], school: School) => {
          if (this.filters.selectedSchools.includes(school.id)) {
            result.push(school.title)
          }

          return result
        }, [])
        .join(',')
    }

    if (this.filters.selectedDuration.length > 0) {
      query.duration = this.duration()
        .reduce((result: PrimaryKey[], duration: Duration) => {
          if (this.filters.selectedDuration.includes(duration.id)) {
            result.push(duration.slug)
          }

          return result
        }, [])
        .join(',')
    }

    if (this.filters.selectedPaymentTypes.length > 0) {
      query.paymenttype = this.paymentTypes()
        .reduce((result: PrimaryKey[], paymentType: PaymentType) => {
          if (this.filters.selectedPaymentTypes.includes(paymentType.id)) {
            result.push(paymentType.slug)
          }

          return result
        }, [])
        .join(',')
    }

    if (this.filters.selectedEducationFormats.length > 0) {
      query.educationformat = this.educationFormats()
        .reduce((result: PrimaryKey[], educationFormat: EducationFormat) => {
          if (this.filters.selectedEducationFormats.includes(educationFormat.id)) {
            result.push(educationFormat.slug)
          }

          return result
        }, [])
        .join(',')
    }

    this.router.navigate([this.path], {
      queryParams: query
    })

    const metaCanonical = document.querySelector('[rel="canonical"]')
    if (metaCanonical) {
      const value = `${window.location.origin}${this.path}${new URLSearchParams(JSON.stringify(query)).toString()}`

      metaCanonical.setAttribute('href', value)
    }
  }

  loadCourses(filters: any) {
    this.filters = { ...this.filters, ...filters }
    this.updateUrl()
    this.store.dispatch(CoursesActions.getCourses({ filters: this.filters }));
  }
  loadMoreCourses() {
    this.filters.page++;
    this.store.dispatch(CoursesActions.loadMore({ filters: this.filters }));
  }

  ngOnInit() {
    this.store.dispatch(CoursesCategoriesActions.getCoursesCategories());

    this.categorySlug = this.route.snapshot.params['slug'];
    if (this.categorySlug) {
      const category = this.categories().find(c => c.slug === this.categorySlug)
      this.setCategories(category)
      this.seo = this.seoService.getSeoData(category?.seo, this.router.url)
    }

    this.store.dispatch(SchoolsActions.getSchools({ filters: {} }));
    this.store.dispatch(DurationActions.getDurations());
    this.store.dispatch(PaymentTypesActions.getPaymentTypes());
    this.store.dispatch(EducationFormatsActions.getEducationFormats());

    this.checkQueryParams()

    // Диспатчим экшен для получения courses с бэкенда при загрузке компонента
    this.store.dispatch(CoursesActions.getCourses({ filters: this.filters }));
  }
}
