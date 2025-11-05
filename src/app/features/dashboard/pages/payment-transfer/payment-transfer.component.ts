import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTransferFormComponent } from '../../../../components/ui/payment-transfer-form/payment-transfer-form.component';
import { Account } from '../../../../core/models';

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

  accounts: Account[] = [
    {
      id: 'acc_1',
      availableBalance: 1500.0,
      currentBalance: 1500.0,
      officialName: 'BNP Paribas Gold Checking',
      mask: '0000',
      institutionId: 'bnp',
      name: 'BNP Paribas',
      type: 'depository',
      subtype: 'checking',
      appwriteItemId: 'itm_bnp_1',
      sharableId: 'shr-bnp-1',
    },
    {
      id: 'acc_2',
      availableBalance: 1000.0,
      currentBalance: 1000.0,
      officialName: 'Société Générale Standard',
      mask: '1111',
      institutionId: 'sg',
      name: 'Société Générale',
      type: 'depository',
      subtype: 'savings',
      appwriteItemId: 'itm_sg_1',
      sharableId: 'shr-sg-1',
    },
  ];
}
