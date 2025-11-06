// src/app/features/dashboard/pages/home/home.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




import { HeaderBoxComponent } from '../../../../components/ui/header-box/header-box.component';
import { Account, Transaction, User } from '../../../../core/models';
import { RecentTransactionsComponent } from '../../../../components/transaction/recent-transactions/recent-transactions.component';
import { TotalBalanceBoxComponent } from '../../../../components/ui/total-balance-box/total-balance-box.component';
import { RightSidebarComponent } from '../../../../components/right-sidebar/right-sidebar.component';
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

  accounts = signal<Account[]>([]);
  selectedAccount = signal<{ transactions: Transaction[] } | null>(null);
  totals = signal({ totalBanks: 0, totalCurrentBalance: 0 });
  page = signal(1);
  itemId = signal<string>('');

  async ngOnInit() {
    // ✅ données simulées
    const mockAccounts: Account[] = [
      {
        id: 'a1',
        availableBalance: 1200,
        currentBalance: 1500,
        officialName: 'Main Checking',
        mask: '1234',
        institutionId: 'bank_001',
        name: 'BNP Paribas',
        type: 'depository',
        subtype: 'checking',
        appwriteItemId: 'item_001',
        sharableId: 'sharable_001'
      },
      {
        id: 'a2',
        availableBalance: 800,
        currentBalance: 1000,
        officialName: 'Savings Account',
        mask: '5678',
        institutionId: 'bank_002',
        name: 'Société Générale',
        type: 'depository',
        subtype: 'savings',
        appwriteItemId: 'item_002',
        sharableId: 'sharable_002'
      }
    ];

    const mockTransactions: Transaction[] = [
      {
        id: 't1',
        $id: 't1',
        name: 'Payment - Amazon',
        paymentChannel: 'online',
        type: 'debit',
        accountId: 'a1',
        amount: 85.99,
        pending: false,
        category: 'Shopping',
        date: '2025-11-01',
        image: '',
        $createdAt: '2025-11-01',
        channel: 'online',
        senderBankId: 'a1',
        receiverBankId: 'a2'
      },
      {
        id: 't2',
        $id: 't2',
        name: 'Salary - Company',
        paymentChannel: 'deposit',
        type: 'credit',
        accountId: 'a1',
        amount: 2000,
        pending: false,
        category: 'Income',
        date: '2025-10-29',
        image: '',
        $createdAt: '2025-10-29',
        channel: 'deposit',
        senderBankId: 'a2',
        receiverBankId: 'a1'
      }
    ];

    this.accounts.set(mockAccounts);
    this.totals.set({
      totalBanks: mockAccounts.length,
      totalCurrentBalance: mockAccounts.reduce((sum, acc) => sum + acc.currentBalance, 0)
    });
    this.selectedAccount.set({ transactions: mockTransactions });
    this.itemId.set(mockAccounts[0].appwriteItemId);
  }
}