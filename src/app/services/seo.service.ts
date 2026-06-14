import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@/environments/environment';

export interface SeoImage {
  path?: string;
  width?: number | string;
  height?: number | string;
}

export interface SeoOg {
  url?: string;
  title?: string;
  description?: string;
  image?: SeoImage;
}

export interface SeoData {
  title?: string;
  description?: string;
  robots?: boolean;
  modifiedTime?: string;
  og?: SeoOg;
}

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  getSeoData(seo: SeoData | undefined, url: string): SeoData {
    seo = seo || {} as SeoData;
    seo.og = seo?.og ?? {};
    seo.og.url = environment.baseUrl + url;
    return seo;
  }

  applyHeadData(seo: SeoData | null): void {
    if (seo === null) {
      seo = { og: { image: {} } };
    }

    // title
    this.titleService.setTitle(seo.title ?? '');

    // meta теги
    const tags: { name: string; content: string }[] = [
      {
        name: 'robots',
        content: seo.robots ? 'index, follow' : 'noindex, nofollow',
      },
      {
        name: 'description',
        content: seo.description ?? '',
      },
      {
        name: 'og:locale',
        content: 'ru_RU',
      },
      {
        name: 'og:type',
        content: 'article',
      },
      {
        name: 'og:site_name',
        content: 'EdVisor',
      },
      {
        name: 'og:url',
        content: seo.og?.url ?? '',
      },
      {
        name: 'article:modified_time',
        content: (seo.modifiedTime || '0000-00-00T00:00:00+00:00') ?? '',
      },
      {
        name: 'og:image',
        content: seo.og?.image?.path ?? '',
      },
      {
        name: 'og:image:width',
        content: String(seo.og?.image?.width || 0),
      },
      {
        name: 'og:image:height',
        content: String(seo.og?.image?.height || 0),
      },
      {
        name: 'og:description',
        content: (seo.og?.description || seo.description) ?? '',
      },
      {
        name: 'og:title',
        content: (seo.og?.title || seo.title) ?? '',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '',
      },
      {
        name: 'twitter:title',
        content: (seo.og?.title || seo.title) ?? '',
      },
      {
        name: 'twitter:description',
        content: (seo.og?.description || seo.description) ?? '',
      },
    ];

    tags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }
}
