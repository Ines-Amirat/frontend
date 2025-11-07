// src/app/components/common/total-balance-box/total-balance-box.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { AnimatedCounterComponent } from '../animated-counter/animated-counter.component';
import {  BankAccount } from '../../../core/models';
import { formatAmount } from '../../../core/utils/utils';


@Component({
  selector: 'app-total-balance-box',
  standalone: true,
  imports: [CommonModule, DoughnutChartComponent, AnimatedCounterComponent],
  template: `
    <section class="total-balance">
      <div class="total-balance-chart">
        <app-doughnut-chart [accounts]="accounts"></app-doughnut-chart>
      </div>

      <div class="flex flex-col gap-6">
        <h2 class="header-2">{{ totalBanks }} Bank Accounts</h2>

        <div class="flex flex-col gap-2">
          <p class="total-balance-label">Total Current Balance</p>

          <p class="total-balance-amount flex-center gap-2">
            $<app-animated-counter [amount]="formattedAmount"></app-animated-counter>
          </p>
        </div>
      </div>
    </section>
  `,
})
export class TotalBalanceBoxComponent {
  @Input() accounts: BankAccount[] = [];
  @Input() totalBanks = 0;
  @Input() totalCurrentBalance = 0;

  get formattedAmount(): string {
    return formatAmount(this.totalCurrentBalance);
  }
}
