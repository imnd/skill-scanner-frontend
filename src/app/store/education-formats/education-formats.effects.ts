import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EducationFormatsActions } from './education-formats.actions';
import { EducationFormatsService } from '@/services/education-formats.service';

@Injectable()
export class EducationFormatsEffects {
  private readonly actions$ = inject(Actions);
  private readonly educationFormatsService = inject(EducationFormatsService);

  getEducationFormats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EducationFormatsActions.getEducationFormats),
      switchMap(() =>
        this.educationFormatsService.getAll().pipe(
          map((response) => EducationFormatsActions.getEducationFormatsSuccess({ educationFormats: response.data })),
          catchError((error) => of(EducationFormatsActions.getEducationFormatsFailure({ error })))
        )
      )
    )
  );
}

