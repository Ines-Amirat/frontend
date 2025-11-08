// src/app/pages/transaction-history/transaction-history.page.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderBoxComponent } from '../../../../components/ui/header-box/header-box.component';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { AccountsService } from '../../../../core/services/accounts.service';
import { TransactionsService } from '../../../../core/services/transaction.service';
import { BankAccount, Transaction, User } from '../../../../core/models';
import { BankDropdownComponent } from '../../../../components/bank/bank-drop-dwon/bank-drop-dwon.component';
import { TransactionHistoryTableComponent } from '../../../../components/transactions/transaction-history-table/transaction-history-table.component';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe,
    HeaderBoxComponent, BankDropdownComponent, TransactionHistoryTableComponent
  ],
  template: `<!-- ton template inchangé --> 
  <section class="transactions">
    <div class="transactions-header">
      <app-header-box
        [title]="'Transaction History'"
        [subtext]="'See your bank details and transactions.'">
      </app-header-box>

      <app-bank-dropdown
        [accounts]="accounts()" (changed)="onSelectAccountId($event.id)">
      </app-bank-dropdown>
    </div>

    <div class="space-y-6">
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

  // ✅ Fallback: si l’AuthService n’a pas d’id, on met un mock UUID (comme Home)
  private getUserId(): string | null {
    const u = this.auth.user();
    if (u?.id) return u.id as unknown as string;
    if (u && (u as any).userId) return (u as any).userId; // si jamais
    // MOCK (à supprimer quand l’auth sera branchée)
    return '11111111-1111-1111-1111-111111111111';
  }

  ngOnInit(): void {
    const uid = this.getUserId();
    if (!uid) { this.router.navigate(['/sign-in']); return; }

    // garde une copie locale de l’utilisateur si besoin pour l’UI
    this.user.set(this.auth.user() ?? { firstName: 'User' } as any);

    this.route.queryParamMap.subscribe(params => {
      const pageNum = Number(params.get('page') || '1');
      this.currentPage.set(Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1);

      const idParam = params.get('id') || undefined;
      this.loadData(uid, idParam);
    });
  }

  onSelectAccountId(id: string) {
    this.router.navigate([], { queryParams: { id }, queryParamsHandling: 'merge' });
  }

  private loadData(userId: string, idParam?: string) {
    this.accountsSvc.listByUser(userId).subscribe({
      next: (accs) => {
        this.accounts.set(accs);

        if (!accs.length) {
          this.account.set(undefined);
          this.transactions.set([]);
          return;
        }

        const fallback = accs[0].id;
        this.selectedId = idParam || fallback;

        const found = accs.find(a => a.id === this.selectedId) || accs[0];
        this.account.set(found);


        console.log('ACCOUNT FOUND →', found);          // doit contenir { id: 'xxxxxxxx-xxxx-....' }
        console.log('CALL TX WITH →', found.id);
        this.txSvc.listByAccount(found.id).subscribe({
          next: txs => { console.log('TX OK →', txs); this.transactions.set(txs); },
          error: e => { console.error('TX ERR →', e); this.transactions.set([]); }
        });
      },
      error: (e) => { console.error('ACCOUNTS error', e); this.accounts.set([]); this.transactions.set([]); }
    });
  }
}
