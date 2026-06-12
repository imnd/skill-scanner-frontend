import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsActions } from './posts.actions';
import { PostsService } from '@/services/posts.service';

@Injectable()
export class PostsEffects {
  private readonly actions$ = inject(Actions);
  private readonly postsService = inject(PostsService);

  getPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPost),
      switchMap(({ slug }) =>
        this.postsService.getPost(slug).pipe(
          map((response) => PostsActions.getPostSuccess({ post: response.data })),
          catchError((error) => of(PostsActions.getPostFailure({ error })))
        )
      )
    )
  );

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPosts),
      switchMap(() =>
        this.postsService.getPosts().pipe(
          map((response) => PostsActions.getPostsSuccess({ posts: response.data })),
          catchError((error) => of(PostsActions.getPostsFailure({ error })))
        )
      )
    )
  );
}

