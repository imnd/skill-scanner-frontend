import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentType } from '@/store/payment-types/payment-types.model';

@Injectable({ providedIn: 'root' })
export class PaymentTypesService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/payment-types`;

  getAll() {
    return this.http.get<{ data: PaymentType[] }>(this.apiUrl);
  }
}
