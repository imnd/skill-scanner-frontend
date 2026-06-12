import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Duration } from './duration.model';

export const DurationActions = createActionGroup({
  source: 'Duration/API',
  events: {
    'Load Durations': props<{ durations: Duration[] }>(),
    'Add Duration': props<{ duration: Duration }>(),
    'Upsert Duration': props<{ duration: Duration }>(),
    'Add Durations': props<{ durations: Duration[] }>(),
    'Upsert Durations': props<{ durations: Duration[] }>(),
    'Update Duration': props<{ duration: Update<Duration> }>(),
    'Update Durations': props<{ durations: Update<Duration>[] }>(),
    'Delete Duration': props<{ id: string }>(),
    'Delete Durations': props<{ ids: string[] }>(),
    'Clear Durations': emptyProps(),

    // Async actions
    'Get Durations': emptyProps(),
    'Get Durations Success': props<{ durations: Duration[] }>(),
    'Get Durations Failure': props<{ error: any }>(),
  },
});

