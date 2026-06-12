import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { School } from './schools.model';

export const SchoolsActions = createActionGroup({
  source: 'Schools/API',
  events: {
    'Load Schools': props<{ schools: School[] }>(),
    'Add School': props<{ school: School }>(),
    'Upsert School': props<{ school: School }>(),
    'Add Schools': props<{ schools: School[] }>(),
    'Upsert Schools': props<{ schools: School[] }>(),
    'Update School': props<{ school: Update<School> }>(),
    'Update Schools': props<{ schools: Update<School>[] }>(),
    'Delete School': props<{ id: string }>(),
    'Delete Schools': props<{ ids: string[] }>(),
    'Clear Schools': emptyProps(),

    // Async actions
    'Get School': props<{ slug: string }>(),
    'Get School Success': props<{ school: School }>(),
    'Get School Failure': props<{ error: any }>(),

    'Get Schools': props<{ filters?: any }>(),
    'Get Schools Success': props<{ schools: School[]; count: number }>(),
    'Get Schools Failure': props<{ error: any }>(),

    'Load More': props<{ filters?: any }>(),
    'Load More Success': props<{ schools: School[] }>(),
    'Load More Failure': props<{ error: any }>(),
  },
});

