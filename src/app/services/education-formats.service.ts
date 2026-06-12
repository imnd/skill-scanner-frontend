import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EducationFormat } from '@/store/education-formats/education-formats.model';

@Injectable({ providedIn: 'root' })
export class EducationFormatsService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/education-formats`;

  getAll() {
    return this.http.get<{ data: EducationFormat[] }>(this.apiUrl);
  }
}
