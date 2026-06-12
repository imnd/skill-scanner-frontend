export interface SchoolReview {
  id: string | number;
  user: {
    id: string | number;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  course?: {
    id: string | number;
    title?: string;
  } | null;
  school?: {
    id: string | number;
    title: string;
    logo?: string;
    averageRating?: string | number;
  } | null;
  text: string;
  rating: string | number;
  userFullName?: string;
  createdAt?: string;
}


