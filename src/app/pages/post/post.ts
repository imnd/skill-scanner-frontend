import { Component, inject, OnInit } from '@angular/core';
import { DateTimeService } from '@/services/date-time';
import { SeoData, SeoService } from '@/services/seo.service';
import { environment } from '@/environments/environment';
import { PostsActions } from '@/store/posts/posts.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { postsFeature } from '@/store/posts/posts.reducer';
import { toIterable } from '@/app/utils/utils.iterator';

type SocNets = {
  [key: string]: {
    'url': string,
    'logo': string,
  },
}

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  readonly dateTimeService = inject(DateTimeService);
  private readonly seoService = inject(SeoService);

  socNets = toIterable(<SocNets>{
    'vk': {
      'url': 'https://vk.com/share.php?url=',
      'logo': 'vk.svg',
    },
    'facebook': {
      'url': 'https://www.facebook.com/sharer/sharer.php?u=',
      'logo': 'fb.svg',
    },
    'twitter': {
      'url': 'http://twitter.com/share?url=',
      'logo': 'twitter.svg',
    },
  })

  private store= inject(Store);
  post = this.store.selectSignal(postsFeature.selectPost);

  seo: SeoData | null = null;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  ngOnInit() {
    this.seo = this.seoService.getSeoData(environment.seo.posts, this.router.url)
    this.seoService.applyHeadData(this.seo);
    const slug = this.route.snapshot.params['slug'];
    this.store.dispatch(PostsActions.getPost({ slug }));
  }
}
