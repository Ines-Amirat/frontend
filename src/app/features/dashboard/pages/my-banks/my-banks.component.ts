import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderBoxComponent } from '../../../../components/ui/header-box/header-box.component';
import { BankCardComponent } from '../../../../components/bank/bank-card/bank-card.component';
import { Account, User } from '../../../../core/models';
import { AccountsService } from '../../../../core/services/accounts.service';
import { AuthServiceService } from '../../../../core/services/auth-service.service';



@Component({
  standalone: true,
  selector: 'app-my-banks-page',
  imports: [CommonModule, CurrencyPipe, HeaderBoxComponent, BankCardComponent],
  template: `
    <section class="flex">
      <div class="my-banks w-full">
        <app-header-box
          [title]="'My Bank Accounts'"
          [subtext]="'Effortlessly Manage Your Banking Activities'">
        </app-header-box>

        <div class="space-y-4">
          <h2 class="header-2">Your cards</h2>

          <ng-container *ngIf="loading(); else content">
            <p class="text-sm opacity-70">Loading...</p>
          </ng-container>

          <ng-template #content>
            <div *ngIf="error(); else cards" class="text-sm text-red-600">{{ error() }}</div>
            <ng-template #cards>
              <div class="flex flex-wrap gap-6">
                <app-bank-card
                  *ngFor="let account of accounts()"
                  [account]="account"
                  [userName]="(user()?.firstName || '') + ' ' + (user()?.lastName || '')">
                </app-bank-card>
              </div>

              <!-- Optionnel: récap -->
              <div class="mt-6 text-sm text-gray-600">
                <span>Total banks: {{ totalBanks() }}</span> ·
                <span>Total balance: {{ totalCurrentBalance() | currency:'USD' }}</span>
              </div>
            </ng-template>
          </ng-template>
        </div>
      </div>
    </section>
  `
})
export class MyBanksComponent implements OnInit {
  // state
  user = signal<User | null>(null);
  accounts = signal<Account[]>([]);
  loading = signal(true);
  error = signal('');

  // dérivés
  totalBanks = computed(() => this.accounts().length);
  totalCurrentBalance = computed(() =>
    this.accounts().reduce((sum, a) => sum + Number(a.currentBalance || 0), 0)
  );

  constructor(
    private auth: AuthServiceService,
    private accountsSvc: AccountsService,
    private router: Router
  ) {}
   
ngOnInit(): void {
  const u = this.auth.user(); // ton signal readonly
  if (!u) {
    this.router.navigate(['/sign-in']);
    return;
  }
  this.user.set(u);

  this.accountsSvc.getAll().subscribe({
    next: (data) => { this.accounts.set(data); this.loading.set(false); },
    error: () => { this.error.set('Failed to load accounts'); this.loading.set(false); }
  });
}

}
