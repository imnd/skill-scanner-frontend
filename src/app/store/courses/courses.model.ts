import { Duration } from '../duration/duration.model';
import { PaymentType } from '../payment-types/payment-types.model';
import { EducationFormat } from '../education-formats/education-formats.model';

export interface Course {
  id: string | number;
  title: string;
  price: string | number;
  creditPrice?: string | number;
  discount?: string | number;
  creditDiscount?: string | number;
  priceWithDiscount?: string | number | null;
  creditPriceWithDiscount?: string | number | null;
  link?: string;
  durations?: Duration[];
  paymentTypes?: PaymentType[];
  educationFormats?: EducationFormat[];
  school: {
    id: string | number;
    title?: string;
    logo?: string;
    slug?: string;
    reviewsCount?: number;
    averageRating?: string | number;
    link?: string;
  };
}

