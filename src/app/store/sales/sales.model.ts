import { School } from '../schools/schools.model';

export interface Sale {
  id: string | number;
  school: Omit<School, 'description' | 'shortDescription' | 'categories'>
  dateStart?: string;
  dateEnd?: string;
  title: string;
  description?: string;
  saleUrl?: string;
}


