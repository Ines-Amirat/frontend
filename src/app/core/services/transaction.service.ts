import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Transaction } from '../models';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  listByAccountId(accountId?: string): Observable<Transaction[]> {
    if (environment.useMock) {
      return this.http.get<Transaction[]>('assets/mocks/transactions.json').pipe(
        map(txs => {
          const data = accountId ? txs.filter(t => t.accountId === accountId) : txs;
          return data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        })
      );
    }
    let params = new HttpParams();
    if (accountId) params = params.set('accountId', accountId);
    return this.http.get<Transaction[]>(`${this.base}/transactions`, { params });
  }
}

