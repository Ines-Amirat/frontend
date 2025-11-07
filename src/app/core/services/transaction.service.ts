import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BankAccount, Transaction, UUID } from '../models';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/transactions`;

  listByAccount(accountId: UUID) {
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Transaction[]>(this.base, { params });
  }
  
  create(payload: {
    accountId: UUID;
    direction: 'CREDIT' | 'DEBIT';
    amount: number;
    channel?: string;
    category?: string;
    description?: string;
  }) {
    return this.http.post<Transaction>(this.base, payload);
  }
}

