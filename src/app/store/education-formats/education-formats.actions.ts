import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { EducationFormat } from './education-formats.model';

export const EducationFormatsActions = createActionGroup({
  source: 'EducationFormats/API',
  events: {
    'Load EducationFormats': props<{ educationFormats: EducationFormat[] }>(),
    'Add EducationFormat': props<{ educationFormat: EducationFormat }>(),
    'Upsert EducationFormat': props<{ educationFormat: EducationFormat }>(),
    'Add EducationFormats': props<{ educationFormats: EducationFormat[] }>(),
    'Upsert EducationFormats': props<{ educationFormats: EducationFormat[] }>(),
    'Update EducationFormat': props<{ educationFormat: Update<EducationFormat> }>(),
    'Update EducationFormats': props<{ educationFormats: Update<EducationFormat>[] }>(),
    'Delete EducationFormat': props<{ id: string }>(),
    'Delete EducationFormats': props<{ ids: string[] }>(),
    'Clear EducationFormats': emptyProps(),

    // Async actions
    'Get EducationFormats': emptyProps(),
    'Get EducationFormats Success': props<{ educationFormats: EducationFormat[] }>(),
    'Get EducationFormats Failure': props<{ error: any }>(),
  },
});

