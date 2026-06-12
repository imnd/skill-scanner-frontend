import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '@/store/courses/courses.model';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/courses`;

  private buildHttpParams(filters: any): HttpParams {
    let params = new HttpParams();
    if (!filters) return params;

    for (const key of Object.keys(filters)) {
      const value = filters[key];
      if (value === undefined || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          params = params.append(`${key}[]`, String(val));
        });
      } else {
        params = params.set(key, String(value));
      }
    }
    return params;
  }

  getCourses(filters: any) {
    const params = this.buildHttpParams(filters);
    return this.http.get<{ data: Course[]; meta: { total: number } }>(this.apiUrl, { params });
  }
}
