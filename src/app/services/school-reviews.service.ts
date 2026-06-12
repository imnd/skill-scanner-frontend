import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchoolReview } from '@/store/school-reviews/school-reviews.model';

@Injectable({ providedIn: 'root' })
export class SchoolReviewsService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reviews`;

  getLastReviews() {
    return this.http.get<{ data: SchoolReview[] }>(`${this.apiUrl}/last?entity=school`);
  }
}
