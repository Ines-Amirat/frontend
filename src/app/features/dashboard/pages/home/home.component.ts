// src/app/features/dashboard/pages/home/home.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderBoxComponent } from '../../../../components/ui/header-box/header-box.component';
import {  BankAccount, Transaction, User } from '../../../../core/models';
import { RecentTransactionsComponent } from '../../../../components/transaction/recent-transactions/recent-transactions.component';
import { TotalBalanceBoxComponent } from '../../../../components/ui/total-balance-box/total-balance-box.component';
import { RightSidebarComponent } from '../../../../components/right-sidebar/right-sidebar.component';
import { AccountsService } from '../../../../core/services/accounts.service';
import { TransactionsService } from '../../../../core/services/transaction.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderBoxComponent,
    TotalBalanceBoxComponent,
    RecentTransactionsComponent,
    RightSidebarComponent
  ],
  template: `
    <section class="home">
      <div class="home-content">
        <header class="home-header">
          <app-header-box
            type="greeting"
            [title]="'Welcome'"
            [user]="user()?.firstName"
            [subtext]="'Access & manage your account and transactions efficiently.'"
          />
          <app-total-balance-box
            [accounts]="accounts()"
            [totalBanks]="totals().totalBanks"
            [totalCurrentBalance]="totals().totalCurrentBalance"
          />
        </header>

        <app-recent-transactions
          [accounts]="accounts()"
          [transactions]="selectedAccount()?.transactions || []"
          [appwriteItemId]="itemId()"
          [page]="page()"
        />
      </div>

      <app-right-sidebar
        [user]="user()!"
        [transactions]="selectedAccount()?.transactions || []"
        [banks]="accounts().slice(0, 2)"
      />
    </section>
  `
})
export class HomeComponent implements OnInit {


  constructor(
  private accSvc: AccountsService,
  private txSvc: TransactionsService
) {}

  // 💡 Fake signals pour le mode hors-backend
  user = signal<User | null>({
    $id: 'u1',
    email: 'test@demo.com',
    userId: 'u1',
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    firstName: 'Imene',
    lastName: 'Amirat',
    address1: '123 Demo St',
    city: 'Montpellier',
    state: 'FR',
    postalCode: '34000',
    dateOfBirth: '2000-01-01',
    ssn: '1111'
  });

  accounts = signal<BankAccount[]>([]);
  selectedAccount = signal<{ transactions: Transaction[] } | null>(null);
  totals = signal({ totalBanks: 0, totalCurrentBalance: 0 });
  page = signal(1);
  itemId = signal<string>('');

  

ngOnInit() {
  this.accSvc.getAll().subscribe({
    next: (accs) => {
      this.accounts.set(accs);

      this.totals.set({
        totalBanks: accs.length,
        totalCurrentBalance: accs.reduce((s, a) => s + (a.balance || 0), 0),
      });

      const first = accs[0];
      if (!first) {
        this.itemId.set('');
        this.selectedAccount.set({ transactions: [] });
        return;
      }

      this.itemId.set(first.id);                   // use backend id
      this.txSvc.listByAccount(first.id).subscribe({
        next: (txs) => this.selectedAccount.set({ transactions: txs }),
        error: () => this.selectedAccount.set({ transactions: [] }),
      });
    },
    error: () => {
      this.accounts.set([]);
      this.itemId.set('');
      this.selectedAccount.set({ transactions: [] });
      this.totals.set({ totalBanks: 0, totalCurrentBalance: 0 });
    },
  });
}


}