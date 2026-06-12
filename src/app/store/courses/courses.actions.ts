import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Course } from './courses.model';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': props<{ courses: Course[] }>(),
    'Add Course': props<{ course: Course }>(),
    'Upsert Course': props<{ course: Course }>(),
    'Add Courses': props<{ courses: Course[] }>(),
    'Upsert Courses': props<{ courses: Course[] }>(),
    'Update Course': props<{ course: Update<Course> }>(),
    'Update Courses': props<{ courses: Update<Course>[] }>(),
    'Delete Course': props<{ id: string }>(),
    'Delete Courses': props<{ ids: string[] }>(),
    'Clear Courses': emptyProps(),

    // Async actions
    'Get Courses': props<{ filters?: any }>(),
    'Get Courses Success': props<{ courses: Course[]; count: number }>(),
    'Get Courses Failure': props<{ error: any }>(),

    'Load More': props<{ filters?: any }>(),
    'Load More Success': props<{ courses: Course[] }>(),
    'Load More Failure': props<{ error: any }>(),
  },
});

