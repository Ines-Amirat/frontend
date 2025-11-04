import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// modèles + utils (adapte les chemins si besoin)

import { CategoryBadgeComponent } from '../category-badge/category-badge.component';
import { Transaction } from '../../../core/models';
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from '../../../core/utils/utils';
import { TransactionStatusPipe } from "../../../core/pipes/transaction-status.pipe";
import { FormatDateTimePipe } from "../../../core/pipes/format-date-time.pipe";

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule, CategoryBadgeComponent, TransactionStatusPipe, FormatDateTimePipe],
  template: `
    <table class="w-full border-collapse">
      <thead class="bg-[#F9FAFB]">
        <tr>
          <th class="px-2 text-left py-3">Transaction</th>
          <th class="px-2 text-left py-3">Amount</th>
          <th class="px-2 text-left py-3">Status</th>
          <th class="px-2 text-left py-3">Date</th>
          <th class="px-2 text-left py-3 max-md:hidden">Channel</th>
          <th class="px-2 text-left py-3 max-md:hidden">Category</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let t of transactions; trackBy: trackById"
            [ngClass]="rowClass(t)"
            class="border-b">
          <!-- Transaction -->
          <td class="max-w-[250px] pl-2 pr-10 py-3">
            <div class="flex items-center gap-3">
              <h1 class="text-14 truncate font-semibold text-[#344054]">
                {{ removeSpecialCharacters(t.name) }}
              </h1>
            </div>
          </td>

          <!-- Amount -->
          <td class="pl-2 pr-10 py-3 font-semibold"
              [ngClass]="amountClass(t)">
            {{ displayAmount(t) }}
          </td>

        
        <td>
  <app-category-badge [category]="t.date | transactionStatus"></app-category-badge>
</td>

<td>
  {{ t.date | formatDateTime }}
</td>
          <!-- Channel -->
          <td class="min-w-24 pl-2 pr-10 py-3 capitalize max-md:hidden">
            {{ t.paymentChannel }}
          </td>

          <!-- Category -->
          <td class="pl-2 pr-10 py-3 max-md:hidden">
            <app-category-badge [category]="t.category" />
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class TransactionTableComponent {
  @Input({ required: true }) transactions: Transaction[] = [];

  // expose utils au template
  cn = cn;
  formatDateTime = formatDateTime;
  removeSpecialCharacters = removeSpecialCharacters;
  getTransactionStatus = getTransactionStatus;

  trackById = (_: number, t: Transaction) => t.id ?? t.$id;

  rowClass(t: Transaction) {
    const amt = formatAmount(t.amount);
    const isDebit = t.type === 'debit' || amt.startsWith('-');
    return this.cn(
      isDebit ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]',
      '!over:bg-none', // gardé pour rester fidèle au style original
      '!border-b-DEFAULT'
    );
  }

  amountClass(t: Transaction) {
    const amt = formatAmount(t.amount);
    const isDebit = t.type === 'debit' || amt.startsWith('-');
    return isDebit ? 'text-[#F04438]' : 'text-[#039855]';
  }

  displayAmount(t: Transaction) {
    const amt = formatAmount(t.amount);
    if (t.type === 'debit') return `-${amt}`;
    if (t.type === 'credit') return amt;
    return amt;
    // (même logique que React; adapte si ton backend donne déjà un signe)
  }

  getFormattedDate(dateStr: string): string {
    return this.formatDateTime(new Date(dateStr)).dateTime;
  }

  getStatus(dateStr: string): string {
    return this.getTransactionStatus(new Date(dateStr));
  }

}
