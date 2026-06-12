import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesCategory } from '@/store/courses-categories/courses-categories.model';

@Injectable({ providedIn: 'root' })
export class CoursesCategoriesService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  getCategories() {
    return this.http.get<{ data: CoursesCategory[] }>(`${this.apiUrl}/courses-categories`);
  }

  getTopCategories(limit?: number) {
    let url = `${this.apiUrl}/courses-categories/top`;
    if (limit !== undefined) {
      url += `/${limit}`;
    }
    return this.http.get<{ data: CoursesCategory[] }>(url);
  }
}
