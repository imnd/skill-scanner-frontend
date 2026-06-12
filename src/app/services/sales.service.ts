import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '@/store/sales/sales.model';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/promotions`;

  getSales() {
    return this.http.get<{ data: Sale[] }>(this.apiUrl);
  }
}
