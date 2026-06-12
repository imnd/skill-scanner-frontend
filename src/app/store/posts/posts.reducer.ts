import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from './posts.model';
import { PostsActions } from './posts.actions';

export const postsFeatureKey = 'posts';

export interface State extends EntityState<Post> {
  post: any;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: State = adapter.getInitialState({
  post: null,
});

export const reducer = createReducer(
  initialState,
  on(PostsActions.addPost, (state, action) => adapter.addOne(action.post, state)),
  on(PostsActions.upsertPost, (state, action) => adapter.upsertOne(action.post, state)),
  on(PostsActions.addPosts, (state, action) => adapter.addMany(action.posts, state)),
  on(PostsActions.upsertPosts, (state, action) => adapter.upsertMany(action.posts, state)),
  on(PostsActions.updatePost, (state, action) => adapter.updateOne(action.post, state)),
  on(PostsActions.updatePosts, (state, action) => adapter.updateMany(action.posts, state)),
  on(PostsActions.deletePost, (state, action) => adapter.removeOne(action.id, state)),
  on(PostsActions.deletePosts, (state, action) => adapter.removeMany(action.ids, state)),
  on(PostsActions.loadPosts, (state, action) => adapter.setAll(action.posts, state)),
  on(PostsActions.clearPosts, (state) => adapter.removeAll(state)),

  // Custom API success handling
  on(PostsActions.getPostSuccess, (state, { post }) => ({
    ...state,
    post,
  })),
  on(PostsActions.getPostsSuccess, (state, { posts }) =>
    adapter.setAll(posts, state),
  ),
);

export const postsFeature = createFeature({
  name: postsFeatureKey,
  reducer,
  extraSelectors: ({ selectPostsState }) => ({
    ...adapter.getSelectors(selectPostsState),
  }),
});

export const { selectPostsState, selectPost } = postsFeature;
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectPostsState);

