// src/app/components/transaction/recent-transactions/recent-transactions.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BankInfoComponent } from '../../bank/bank-info/bank-info.component';
import {  BankAccount, Transaction } from '../../../core/models';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { BankTabItemComponent } from '../../bank/bank-tab-item/bank-tab-item.component';
import { PaginationComponent } from '../../ui/pagination/pagination.component';

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BankInfoComponent,
    BankTabItemComponent,
    TransactionTableComponent,
    PaginationComponent,
  ],
  template: `
    <section class="recent-transactions">
      <header class="flex items-center justify-between">
        <h2 class="recent-transactions-label">Recent transactions</h2>

        <a
          [routerLink]="['/transaction-history/']"
          [queryParams]="{ id: appwriteItemId }"
          class="view-all-btn"
        >
          View all
        </a>
      </header>

      <!-- Tabs -->
      <div class="w-full">
        <!-- Tab list -->
        <div class="recent-transactions-tablist">
          <button
            *ngFor="let acc of accounts"
            type="button"
            class="px-2 py-1"
            [class.bg-bank-gradient]="selectedId === acc.id"
            (click)="selectTab(acc.id)"
          >
            <app-bank-tab-item
              [account]="acc"
              [appwriteItemId]="appwriteItemId"
            ></app-bank-tab-item>
          </button>
        </div>

        <!-- Tab panels -->
        <ng-container *ngFor="let acc of accounts">
          <div
            class="space-y-4"
            *ngIf="selectedId === acc.id"
          >
            <app-bank-info
              [account]="acc"
              [appwriteItemId]="appwriteItemId"
              type="full"
            ></app-bank-info>

            <app-transaction-table
              [transactions]="currentTransactions"
            ></app-transaction-table>

            <div class="my-4 w-full" *ngIf="totalPages > 1">
              <app-pagination
                [totalPages]="totalPages"
                [page]="page"
              ></app-pagination>
            </div>
          </div>
        </ng-container>
      </div>
    </section>
  `,
})
export class RecentTransactionsComponent implements OnChanges {
  @Input() accounts: BankAccount[] = [];
  @Input() transactions: Transaction[] = [];
  @Input() appwriteItemId: string = '';
  @Input() page = 1;

  selectedId: string = '';
  limit = 10;
  totalPages = 1;
  currentTransactions: Transaction[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.transactions?.length) {
      this.totalPages = Math.ceil(this.transactions.length / this.limit);
      this.updateCurrentTransactions();
    }

    // Sélection par défaut
    if (!this.selectedId) {
      this.selectedId = this.appwriteItemId || this.accounts[0]?.id || '';
    }
  }

  selectTab(id: string) {
    this.selectedId = id;
  }

  private updateCurrentTransactions() {
    const end = this.page * this.limit;
    const start = end - this.limit;
    this.currentTransactions = this.transactions.slice(start, end);
  }
}
