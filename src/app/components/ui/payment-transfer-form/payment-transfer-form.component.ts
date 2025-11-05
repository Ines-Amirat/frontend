import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-payment-transfer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col">
      <!-- Select Source Bank -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item pb-6 pt-5 flex gap-4 items-start">
          <div class="payment-transfer_form-content min-w-[280px]">
            <label class="text-14 font-medium text-gray-700 block">
              Select Source Bank
            </label>
            <p class="text-12 font-normal text-gray-600">
              Select the bank account you want to transfer funds from
            </p>
          </div>

          <div class="flex w-full flex-col">
           
            <p class="text-12 text-red-500" *ngIf="showError('senderBank')">
              Please select a valid bank account
            </p>
          </div>
        </div>
      </div>

      <!-- Transfer Note (Optional) -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item pb-6 pt-5 flex gap-4 items-start">
          <div class="payment-transfer_form-content min-w-[280px]">
            <label class="text-14 font-medium text-gray-700 block">
              Transfer Note (Optional)
            </label>
            <p class="text-12 font-normal text-gray-600">
              Please provide any additional information or instructions related to the transfer
            </p>
          </div>

          <div class="flex w-full flex-col">
            <textarea
              placeholder="Write a short note here"
              class="input-class"
              formControlName="name"
              rows="3"
            ></textarea>
            <p class="text-12 text-red-500" *ngIf="showError('name')">
              Transfer note is too short (min 4)
            </p>
          </div>
        </div>
      </div>

      <!-- Section header -->
      <div class="payment-transfer_form-details">
        <h2 class="text-18 font-semibold text-gray-900">Bank account details</h2>
        <p class="text-16 font-normal text-gray-600">Enter the bank account details of the recipient</p>
      </div>

      <!-- Recipient Email -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item py-5 flex gap-4 items-start">
          <label class="text-14 w-full max-w-[280px] font-medium text-gray-700">
            Recipient's Email Address
          </label>
          <div class="flex w-full flex-col">
            <input
              placeholder="ex: johndoe@gmail.com"
              class="input-class"
              type="email"
              formControlName="email"
            />
            <p class="text-12 text-red-500" *ngIf="showError('email')">
              Invalid email address
            </p>
          </div>
        </div>
      </div>

      <!-- Receiver Plaid Sharable Id -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item pb-5 pt-6 flex gap-4 items-start">
          <label class="text-14 w-full max-w-[280px] font-medium text-gray-700">
            Receiver's Plaid Sharable Id
          </label>
          <div class="flex w-full flex-col">
            <input
              placeholder="Enter the public account number"
              class="input-class"
              formControlName="sharableId"
            />
            <p class="text-12 text-red-500" *ngIf="showError('sharableId')">
              Please enter a valid sharable Id (min 8)
            </p>
          </div>
        </div>
      </div>

      <!-- Amount -->
      <div class="border-y border-gray-200">
        <div class="payment-transfer_form-item py-5 flex gap-4 items-start">
          <label class="text-14 w-full max-w-[280px] font-medium text-gray-700">Amount</label>
          <div class="flex w-full flex-col">
            <input
              placeholder="ex: 5.00"
              class="input-class"
              formControlName="amount"
              inputmode="decimal"
            />
            <p class="text-12 text-red-500" *ngIf="showError('amount')">
              Please enter a valid amount (e.g., 5.00)
            </p>
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="payment-transfer_btn-box mt-4">
        <button type="submit" class="payment-transfer_btn" [disabled]="isLoading() || form.invalid">
          <ng-container *ngIf="isLoading(); else idle">
            <svg class="animate-spin h-5 w-5 inline-block mr-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"
                      stroke-linecap="round" stroke-dasharray="60" stroke-dashoffset="20"></circle>
            </svg>
            Sending...
          </ng-container>
          <ng-template #idle>Transfer Funds</ng-template>
        </button>
      </div>
    </form>
  `,
})
export class PaymentTransferFormComponent {
 

  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoading = signal(false);

  form = this.fb.group({
    // Next.js had: name, email, amount, senderBank, sharableId
    senderBank: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(4)] }),
    name: this.fb.control<string>('', { validators: [Validators.minLength(4)] }), // optional, but min 4 if present
    email: this.fb.control<string>('', { validators: [Validators.required, Validators.email] }),
    sharableId: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(8)] }),
    amount: this.fb.control<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        // autorise 5, 5.0, 5.00, etc.
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ],
    }),
  });

  showError(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);

    const { email, name, amount, senderBank, sharableId } = this.form.getRawValue();

  
}
}