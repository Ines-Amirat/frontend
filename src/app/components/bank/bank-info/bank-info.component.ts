// src/app/components/bank/bank-info/bank-info.component.ts
import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountTypes } from '../../../core/models';
import { formatAmount, getAccountTypeColors } from '../../../core/utils/utils';


@Component({
  selector: 'app-bank-info',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div
      (click)="handleBankChange()"
      [class]="'bank-info ' + colors().bg"
      [ngClass]="{
        'shadow-sm border-blue-700': type === 'card' && isActive(),
        'rounded-xl': type === 'card',
        'hover:shadow-sm cursor-pointer': type === 'card'
      }"
    >
      <figure class="flex-center h-fit rounded-full bg-blue-100" [ngClass]="colors().lightBg">
        <img
          ngSrc="/icons/connect-bank.svg"
          width="20"
          height="20"
          [alt]="account?.subtype || 'bank icon'"
          class="m-2 min-w-5"
        />
      </figure>

      <div class="flex w-full flex-1 flex-col justify-center gap-1">
        <div class="bank-info_content">
          <h2
            class="text-16 line-clamp-1 flex-1 font-bold text-blue-900"
            [ngClass]="colors().title"
          >
            {{ account?.name }}
          </h2>

          <p
            *ngIf="type === 'full'"
            class="text-12 rounded-full px-3 py-1 font-medium text-blue-700"
            [ngClass]="[colors().subText, colors().lightBg]"
          >
            {{ account?.subtype }}
          </p>
        </div>

        <p class="text-16 font-medium text-blue-700" [ngClass]="colors().subText">
          {{ formatAmount(account?.currentBalance || 0) }}
        </p>
      </div>
    </div>
  `,
})
export class BankInfoComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input({ required: true }) account!: Account;
  @Input({ required: true }) appwriteItemId!: string;
  @Input() type: 'full' | 'card' = 'full';

  formatAmount = formatAmount;

  isActive = computed(() => this.appwriteItemId === this.account?.appwriteItemId);

  colors = computed(() =>
    getAccountTypeColors((this.account?.type as AccountTypes) || 'other' as AccountTypes)
  );

  handleBankChange() {
    if (!this.account?.appwriteItemId) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: this.account.appwriteItemId },
      queryParamsHandling: 'merge',
      replaceUrl: true,   // évite l’historique inutile (comportement proche de Next router.push(..., {scroll:false}))
    });
  }
}
