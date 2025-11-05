import { Component, Input, OnChanges, SimpleChanges, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionTableComponent } from '../../transaction/transaction-table/transaction-table.component';
import { PaginationComponent } from '../../ui/pagination/pagination.component';
import { Transaction } from '../../../core/models';

@Component({
  selector: 'app-transaction-history-table',
  standalone: true,
  imports: [CommonModule, TransactionTableComponent, PaginationComponent],
  template: `
    <section class="flex w-full flex-col gap-6">
      <app-transaction-table [transactions]="currentTransactions()"></app-transaction-table>

      <div class="my-4 w-full" *ngIf="totalPages() > 1">
        <app-pagination
          [totalPages]="totalPages()"
          [page]="page">
        </app-pagination>
      </div>
    </section>
  `,
})
export class TransactionHistoryTableComponent implements OnChanges {
  // state
  private _transactions = signal<Transaction[]>([]);
  private _page = signal<number>(1);
  private _limit = signal<number>(10);

  // inputs
  @Input() set transactions(v: Transaction[] | null | undefined) {
    this._transactions.set(v ?? []);
  }
  get transactions(): Transaction[] { return this._transactions(); }

  @Input() set page(v: number) { this._page.set(v ?? 1); }
  get page(): number { return this._page(); }

  @Input() set limit(v: number) { this._limit.set(v ?? 10); }
  get limit(): number { return this._limit(); }

  // derived
  readonly tx = computed(() => this._transactions());
  readonly totalPages = computed(() => {
    const len = this.tx().length;
    const lim = Math.max(1, this._limit());
    return Math.max(1, Math.ceil(len / lim));
  });

  readonly currentTransactions = computed(() => {
    const tx = this.tx();
    const page = this.clampPage(this._page(), this.totalPages());
    const limit = Math.max(1, this._limit());
    const last = page * limit;
    const first = last - limit;
    return tx.slice(first, last);
  });

  constructor() {
    // auto-clamp page if data/limit change
    effect(() => {
      const clamped = this.clampPage(this._page(), this.totalPages());
      if (clamped !== this._page()) this._page.set(clamped);
    });
  }

  ngOnChanges(_: SimpleChanges): void {}

  private clampPage(p: number, total: number) {
    if (!Number.isFinite(p) || p < 1) return 1;
    return p > total ? total : p;
  }
}
