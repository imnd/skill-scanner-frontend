import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Post } from './posts.model';

export const PostsActions = createActionGroup({
  source: 'Posts/API',
  events: {
    'Load Posts': props<{ posts: Post[] }>(),
    'Add Post': props<{ post: Post }>(),
    'Upsert Post': props<{ post: Post }>(),
    'Add Posts': props<{ posts: Post[] }>(),
    'Upsert Posts': props<{ posts: Post[] }>(),
    'Update Post': props<{ post: Update<Post> }>(),
    'Update Posts': props<{ posts: Update<Post>[] }>(),
    'Delete Post': props<{ id: string }>(),
    'Delete Posts': props<{ ids: string[] }>(),
    'Clear Posts': emptyProps(),

    // Async actions
    'Get Post': props<{ slug: string }>(),
    'Get Post Success': props<{ post: Post }>(),
    'Get Post Failure': props<{ error: any }>(),

    'Get Posts': emptyProps(),
    'Get Posts Success': props<{ posts: Post[] }>(),
    'Get Posts Failure': props<{ error: any }>(),
  },
});

