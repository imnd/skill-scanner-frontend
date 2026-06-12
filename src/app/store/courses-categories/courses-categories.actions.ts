import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CoursesCategory } from './courses-categories.model';

export const CoursesCategoriesActions = createActionGroup({
  source: 'CoursesCategories/API',
  events: {
    'Load CoursesCategories': props<{ coursesCategories: CoursesCategory[] }>(),
    'Add CoursesCategory': props<{ coursesCategory: CoursesCategory }>(),
    'Upsert CoursesCategory': props<{ coursesCategory: CoursesCategory }>(),
    'Add CoursesCategories': props<{ coursesCategories: CoursesCategory[] }>(),
    'Upsert CoursesCategories': props<{ coursesCategories: CoursesCategory[] }>(),
    'Update CoursesCategory': props<{ coursesCategory: Update<CoursesCategory> }>(),
    'Update CoursesCategories': props<{ coursesCategories: Update<CoursesCategory>[] }>(),
    'Delete CoursesCategory': props<{ id: string }>(),
    'Delete CoursesCategories': props<{ ids: string[] }>(),
    'Clear CoursesCategories': emptyProps(),

    // Async actions
    'Get CoursesCategories': emptyProps(),
    'Get CoursesCategories Success': props<{ categories: CoursesCategory[] }>(),
    'Get CoursesCategories Failure': props<{ error: any }>(),

    'Get Top Categories': props<{ limit?: number }>(),
    'Get Top Categories Success': props<{ topCategories: CoursesCategory[] }>(),
    'Get Top Categories Failure': props<{ error: any }>(),
  },
});
