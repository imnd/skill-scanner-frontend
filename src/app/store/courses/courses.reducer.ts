import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Course } from './courses.model';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface State extends EntityState<Course> {
  coursesCount: number;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: State = adapter.getInitialState({
  coursesCount: 0,
});

export const reducer = createReducer(
  initialState,
  on(CoursesActions.addCourse, (state, action) => adapter.addOne(action.course, state)),
  on(CoursesActions.upsertCourse, (state, action) => adapter.upsertOne(action.course, state)),
  on(CoursesActions.addCourses, (state, action) => adapter.addMany(action.courses, state)),
  on(CoursesActions.upsertCourses, (state, action) => adapter.upsertMany(action.courses, state)),
  on(CoursesActions.updateCourse, (state, action) => adapter.updateOne(action.course, state)),
  on(CoursesActions.updateCourses, (state, action) => adapter.updateMany(action.courses, state)),
  on(CoursesActions.deleteCourse, (state, action) => adapter.removeOne(action.id, state)),
  on(CoursesActions.deleteCourses, (state, action) => adapter.removeMany(action.ids, state)),
  on(CoursesActions.loadCourses, (state, action) => adapter.setAll(action.courses, state)),
  on(CoursesActions.clearCourses, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(CoursesActions.getCoursesSuccess, (state, { courses, count }) =>
    adapter.setAll(courses, { ...state, coursesCount: count }),
  ),
  on(CoursesActions.loadMoreSuccess, (state, { courses }) =>
    adapter.addMany(courses, state),
  ),
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
  extraSelectors: ({ selectCoursesState }) => ({
    ...adapter.getSelectors(selectCoursesState),
  }),
});

export const { selectCoursesState, selectCoursesCount } = coursesFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectCoursesState);

