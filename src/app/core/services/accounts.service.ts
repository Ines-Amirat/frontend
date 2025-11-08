import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BankAccount, UUID } from '../models';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/accounts`;

  listByUser(userId: UUID) {
    const params = new HttpParams().set('userId', String(userId)); // 
    return this.http.get<BankAccount[]>(this.base, { params });
  }

  

  get(id: UUID) {
    return this.http.get<BankAccount>(`${this.base}/${id}`);
  }

}
