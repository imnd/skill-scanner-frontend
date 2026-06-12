import { SeoData } from '@/services/seo.service';

export interface CoursesCategory {
  id: string | number;
  title: string;
  slug: string;
  icon?: string;
  parent?: string | number | null;
  subCategories?: CoursesCategory[];
  topCount?: number;
  seo?: SeoData;
}

