export interface Post {
  id: string | number;
  slug: string;
  cover?: string;
  title: string;
  shortText?: string;
  text?: string;
  viewsCount?: number;
  createdAt?: string;
}


