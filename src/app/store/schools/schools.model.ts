import { SchoolsCategory } from '../schools-categories/schools-categories.model';

export interface School {
  id: string | number;
  slug: string;
  title: string;
  logo?: string;
  description?: string;
  shortDescription?: string;
  categories?: SchoolsCategory[];
  reviewsCount?: number;
  averageRating?: string | number;
  link?: string;
}


