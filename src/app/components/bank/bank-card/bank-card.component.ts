// src/app/components/bank/bank-card.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CopyComponent } from "../../ui/copy/copy.component";

export interface Account {
  id: string;
  name: string;
  currentBalance: number;
  mask: string;                 // last 4
  appwriteItemId: string;       // used in link
  sharableId: string;           // copied when showBalance = true
}

@Component({
  selector: 'app-bank-card',
  standalone: true,
  imports: [RouterLink, CopyComponent],
  template: `
    <div class="flex flex-col">
      <a
        [routerLink]="['/transaction-history']"
        [queryParams]="{ id: account.appwriteItemId }"
        class="bank-card"
      >
        <div class="bank-card_content">
          <div>
            <h1 class="text-16 font-semibold text-white">{{ account.name }}</h1>
            <p class="font-ibm-plex-serif font-black text-white">
              {{ formatAmount(account.currentBalance || 0) }}
            </p>
          </div>

          <article class="flex flex-col gap-2">
            <div class="flex justify-between">
              <h1 class="text-12 font-semibold text-white">{{ userName }}</h1>
              <h2 class="text-12 font-semibold text-white">●● / ●●</h2>
            </div>
            <p class="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span class="text-16">{{ account.mask }}</span>
            </p>
          </article>
        </div>

        <div class="bank-card_icons ">
          <img src="assets/icons/Paypass.svg" width="20" height="24" alt="Paypass" />
          <img src="assets/icons/mastercard.svg" width="45" height="32" alt="visa" />
        </div>

        <img
          src="assets/icons/lines.png"
          width="316"
          height="190"
          alt="lines"
          class="absolute left-0 top-0"
        />
      </a>

      <app-copy *ngIf="showBalance" [title]="account.sharableId || ''" />
    </div>
  `,
})
export class BankCardComponent {
  @Input() account!: Account;
  
  @Input() userName!: string;
  @Input() showBalance = true;

  formatAmount(v: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  }
}
