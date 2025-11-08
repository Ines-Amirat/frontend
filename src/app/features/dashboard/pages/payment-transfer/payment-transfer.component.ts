import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTransferFormComponent } from '../../../../components/ui/payment-transfer-form/payment-transfer-form.component';
import { BankAccount } from '../../../../core/models';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { AccountsService } from '../../../../core/services/accounts.service';

@Component({
  selector: 'app-payment-transfer-component',
  standalone: true,
  imports: [CommonModule, PaymentTransferFormComponent],
  template: `
    <section class="payment-transfer"> <!--  wrapper Bankify -->
      <div class="header-box">          <!-- header util -->
        <h1 class="header-box-title">{{ topTitle }}</h1>
        <p class="header-box-subtext  pb-6">{{ topDescription }}</p>

        <div class="mt-4">
          <h2 class="text-18 font-semibold text-gray-900 pb-2">{{ bottomTitle }}</h2>
          <p class="text-14 text-gray-600">{{ bottomDescription }}</p>
        </div>
      </div>

      <section class="size-full pt-5">
        <app-payment-transfer-form [accounts]="accounts"></app-payment-transfer-form>
      </section>
    </section>
  `,
})



export class PaymentTransferComponent {
  @Input() topTitle = 'Payment Transfer';
  @Input() topDescription = 'Please provide any specific details or notes related to the payment transfer';
  @Input() bottomTitle = 'Transfer details';
  @Input() bottomDescription = 'Enter your transfer details';

  accounts: BankAccount[] = [];

  constructor(
    private auth: AuthServiceService,
    private accountsSvc: AccountsService
  ) {}

  ngOnInit(): void {
    const u = this.auth.user();
    if (!u) return;

    const userId = u.id; 
    this.accountsSvc.listByUser(userId).subscribe({
      next: (accs) => this.accounts = accs,
      error: (err) => console.error('Accounts load error:', err)
    });
  }
}