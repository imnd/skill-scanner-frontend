import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { SchoolReview } from './school-reviews.model';

export const SchoolReviewsActions = createActionGroup({
  source: 'SchoolReviews/API',
  events: {
    'Load SchoolReviews': props<{ schoolReviews: SchoolReview[] }>(),
    'Add SchoolReview': props<{ schoolReview: SchoolReview }>(),
    'Upsert SchoolReview': props<{ schoolReview: SchoolReview }>(),
    'Add SchoolReviews': props<{ schoolReviews: SchoolReview[] }>(),
    'Upsert SchoolReviews': props<{ schoolReviews: SchoolReview[] }>(),
    'Update SchoolReview': props<{ schoolReview: Update<SchoolReview> }>(),
    'Update SchoolReviews': props<{ schoolReviews: Update<SchoolReview>[] }>(),
    'Delete SchoolReview': props<{ id: string }>(),
    'Delete SchoolReviews': props<{ ids: string[] }>(),
    'Clear SchoolReviews': emptyProps(),

    // Async actions
    'Get Last Reviews': emptyProps(),
    'Get Last Reviews Success': props<{ lastReviews: SchoolReview[] }>(),
    'Get Last Reviews Failure': props<{ error: any }>(),
  },
});

