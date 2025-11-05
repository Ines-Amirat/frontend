import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Account } from '../models';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Account[]> {
    if (environment.useMock) {
      return this.http.get<Account[]>('assets/mocks/accounts.json');
    }
    return this.http.get<Account[]>(`${this.base}/accounts`);
  }
}
