// src/app/core/services/banks.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../models';
import { BankByAccount } from '../../components/ui/payment-transfer-form/payment-transfer-form.component';

@Injectable({ providedIn: 'root' })
export class BanksApiService {
  constructor(private http: HttpClient) {}
  getBank(documentId: string) {
    return this.http.get<Bank>(`/api/banks/${documentId}`);
  }
  getBankByAccountId(accountId: string) {
    return this.http.get<BankByAccount>(`/api/accounts/${accountId}/bank`);
  }
}
