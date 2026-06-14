import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { DateTimeService } from '@/services/date-time';
import { SeoData, SeoService } from '@/services/seo.service';

import { postsFeature } from '@/store/posts/posts.reducer';
import { PostsActions } from '@/store/posts/posts.actions';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {
  readonly dateTimeService = inject(DateTimeService);
  private readonly seoService = inject(SeoService);

  private store= inject(Store);
  posts = this.store.selectSignal(postsFeature.selectAll);

  seo: SeoData | null = null;
  private router = inject(Router);
  ngOnInit() {
    this.seo = this.seoService.getSeoData(environment.seo.posts, this.router.url)
    this.seoService.applyHeadData(this.seo);
    this.store.dispatch(PostsActions.getPosts());
  }
}
