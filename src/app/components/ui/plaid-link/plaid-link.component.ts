import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

export interface PlaidLinkUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

@Component({
  selector: 'app-plaid-link',
  standalone: true,
  imports: [NgIf],
  template: `
    <button
      *ngIf="variant === 'primary'; else other"
      class="plaidlink-primary"
      [disabled]="!ready()"
      (click)="openPlaid()"
    >
      Connect bank
    </button>

    <ng-template #other>
      <button
        *ngIf="variant === 'ghost'; else defaultBtn"
        class="plaidlink-ghost flex items-center gap-2"
        [disabled]="!ready()"
        (click)="openPlaid()"
      >
        <img src="/assets/icons/connect-bank.svg" alt="connect bank" width="24" height="24" />
        <p class="hidden text-[16px] font-semibold text-black-2 xl:block">
          Connect Bank
        </p>
      </button>

      <ng-template #defaultBtn>
        <button
          class="plaidlink-default flex items-center gap-2"
          [disabled]="!ready()"
          (click)="openPlaid()"
        >
          <img src="/assets/icons/connect-bank.svg" alt="connect bank" width="24" height="24" />
          <p class="text-[16px] font-semibold text-black-2">Connect Bank</p>
        </button>
      </ng-template>
    </ng-template>
  `,
})
export class PlaidLinkComponent {
  @Input() user!: PlaidLinkUser;
  @Input() variant: 'primary' | 'ghost' | 'default' = 'default';

  // Simule les états "token" et "ready"
  private token = signal<string | null>(null);
  ready = signal(false);

  constructor(private router: Router) {
    // Simule une requête API async (createLinkToken)
    setTimeout(() => {
      this.token.set('fake-link-token');
      this.ready.set(true);
    }, 1000);
  }

  async openPlaid() {
    if (!this.ready()) return;

    // --- Simulation du comportement "usePlaidLink" ---
    console.log('Opening Plaid Link with token:', this.token());
    // Simule un succès après connexion Plaid
    setTimeout(() => {
      console.log('Plaid connection success for user:', this.user);
      // simulate exchangePublicToken + redirect
      this.router.navigateByUrl('/');
    }, 1000);
  }
}
