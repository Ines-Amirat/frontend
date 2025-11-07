// src/app/pages/transaction-history/transaction-history.page.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderBoxComponent } from '../../../../components/ui/header-box/header-box.component';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { AccountsService } from '../../../../core/services/accounts.service';
import { TransactionsService } from '../../../../core/services/transaction.service';
import {  BankAccount, Transaction, User } from '../../../../core/models';
import { BankDropdownComponent } from '../../../../components/bank/bank-drop-dwon/bank-drop-dwon.component';
import { TransactionHistoryTableComponent } from '../../../../components/transactions/transaction-history-table/transaction-history-table.component';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe,
    HeaderBoxComponent, BankDropdownComponent, TransactionHistoryTableComponent
  ],
  template: `
  <section class="transactions">
    <div class="transactions-header">
      <app-header-box
        [title]="'Transaction History'"
        [subtext]="'See your bank details and transactions.'">
      </app-header-box>

      <!-- équivalent BankDropdown -->
     


      <app-bank-dropdown
        [accounts]="accounts()" (changed)="onSelectAccountId($event.id)">
        

</app-bank-dropdown>

    </div>

    <div class="space-y-6">
      <!-- bandeau compte -->
      <div class="transactions-account rounded-xl bg-blue-600 text-white p-5 flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-bold">{{ account()?.name || '—' }}</h2>
          <p class="text-sm text-blue-100">{{ account()?.bankName || '—' }}</p>
          <p class="text-sm font-medium text-blue-100">●●●● ●●●● ●●●● {{ account()?.maskedNumber }}</p>

        </div>
        <div class="transactions-account-balance text-right">
          <p class="text-sm">Current Balance</p>
          <p class="text-2xl font-bold">{{ account()?.balance | currency: (account()?.currency || 'USD') }}</p>
        </div>
      </div>

      <!-- équivalent TransactionHistoryTable -->
      <app-transaction-history-table
        [page]="currentPage()"
        [transactions]="transactions()">
      </app-transaction-history-table>
    </div>
  </section>
  `
})
export class TransactionHistoryComponent implements OnInit {
  user = signal<User | null>(null);
  accounts = signal<BankAccount[]>([]);
  account = signal<BankAccount | undefined>(undefined);
  transactions = signal<Transaction[]>([]);
  currentPage = signal<number>(1);

  private selectedId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthServiceService,
    private accountsSvc: AccountsService,
    private txSvc: TransactionsService
  ) { }

  ngOnInit(): void {
    const u = this.auth.user();
    if (!u) { this.router.navigate(['/sign-in']); return; }
    this.user.set(u);

    this.route.queryParamMap.subscribe(params => {
      const pageNum = Number(params.get('page') || '1');
      this.currentPage.set(Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1);

      const idParam = params.get('id') || undefined;
      this.loadData(idParam);
    });
  }

  onSelectAccountId(id: string) {
    // met à jour ?id=... comme dans Next.js
    this.router.navigate([], { queryParams: { id }, queryParamsHandling: 'merge' });
  }

  private loadData(idParam?: string) {
    this.accountsSvc.getAll().subscribe((accs) => {   
      this.accounts.set(accs);

      if (!accs.length) {                              
        this.account.set(undefined);
        this.transactions.set([]);
        return;
      }

      const fallback = accs[0].id;                   
      this.selectedId = idParam || fallback;

      const found = accs.find(a => a.id === this.selectedId) || accs[0]; // ✅
      this.account.set(found);

      this.txSvc.listByAccount(found.id)               
        .subscribe(txs => this.transactions.set(txs));
    });
  }
}
