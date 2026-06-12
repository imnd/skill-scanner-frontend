export interface Sale {
  id: string | number;
  school: {
    id: string | number;
    title?: string;
    logo?: string;
    slug?: string;
    reviewsCount?: number;
    averageRating?: string | number;
    link?: string;
  };
  dateStart?: string;
  dateEnd?: string;
  title: string;
  description?: string;
  saleUrl?: string;
}


