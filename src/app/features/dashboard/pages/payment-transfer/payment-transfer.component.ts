import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTransferFormComponent } from "../../../../components/ui/payment-transfer-form/payment-transfer-form.component";

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, PaymentTransferFormComponent],
  template: `
    <section>
        <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold text-gray-900">{{ topTitle }}</h1>
      <p class="text-sm text-gray-600">{{ topDescription }}</p>

      <div class="mt-4">
        <h2 class="text-xl font-semibold text-gray-900">{{ bottomTitle }}</h2>
        <p class="text-sm text-gray-600">{{ bottomDescription }}</p>
      </div>
    </div>
     </section>
        <section>
            <app-payment-transfer-form></app-payment-transfer-form>
     </section>
   
  `,
})
export class PaymentTransferComponent {
  @Input() topTitle = '';
  @Input() bottomTitle = '';
  @Input() topDescription = '';
  @Input() bottomDescription = '';
}
