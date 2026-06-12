import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchoolsCategory } from '@/store/schools-categories/schools-categories.model';

@Injectable({ providedIn: 'root' })
export class SchoolsCategoriesService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/schools-categories`;

  getAll() {
    return this.http.get<{ data: SchoolsCategory[] }>(this.apiUrl);
  }
}
