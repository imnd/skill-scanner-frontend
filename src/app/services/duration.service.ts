import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Duration } from '@/store/duration/duration.model';

@Injectable({ providedIn: 'root' })
export class DurationService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/duration`;

  getAll() {
    return this.http.get<{ data: Duration[] }>(this.apiUrl);
  }
}
