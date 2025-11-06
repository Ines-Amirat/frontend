// src/app/components/payment-transfer-form/payment-transfer-form.component.ts
import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BankDropdownComponent, type Account as BankOption } from '../../bank/bank-drop-dwon/bank-drop-dwon.component';
import { FormFieldComponent } from '../form/form.component';

// === Ton dropdown (tel que tu l'as envoyé, sélecteur <app-bank-dropdown>) ===

// ========= 1) Composant réutilisable <app-form-field> (wrapper) ==========
let uid = 0;

export interface Bank {
  id: string;           // id de la "banque" côté backend
  userId: string;       // propriétaire user id
}

export interface BankByAccount {
  bankId: string;       // id banque du destinataire
  accountId: string;    // id compte du destinataire
  userId: string;       // propriétaire
}

export interface TransferParams {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: string; // string pour coller au form
}

export interface TransactionCreate {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

// ====== 3) Services minimalistes pour TON backend (HttpClient) ======
class BanksApi {
  constructor(private http: HttpClient) {}
  // GET /api/banks/:id
  getBank(documentId: string) {
    return this.http.get<Bank>(`/api/banks/${documentId}`);
  }
  // GET /api/accounts/:accountId/bank
  getBankByAccountId(accountId: string) {
    return this.http.get<BankByAccount>(`/api/accounts/${accountId}/bank`);
  }
}

class TransfersApi {
  constructor(private http: HttpClient) {}
  // POST /api/transfers
  createTransfer(body: TransferParams) {
    return this.http.post<{ id: string }>(`/api/transfers`, body);
  }
}

class TransactionsApi {
  constructor(private http: HttpClient) {}
  // POST /api/transactions
  createTransaction(body: TransactionCreate) {
    return this.http.post<{ id: string }>(`/api/transactions`, body);
  }
}

// ====== 4) Formulaire PaymentTransfer (utilise ton dropdown + API perso) ======
@Component({
  selector: 'app-payment-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,            // pour HttpClient
    FormFieldComponent,
    BankDropdownComponent,       // ton dropdown natif
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col">

      <!-- senderBank -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item pb-6 pt-5">
          <div class="payment-transfer_form-content">
            <h3 class="text-14 font-medium text-gray-700">Select Source Bank</h3>
            <p class="text-12 font-normal text-gray-600">
              Select the bank account you want to transfer funds from
            </p>
          </div>

          <app-form-field
            [control]="form.get('senderBank')"
            #ffSender="appFormField"
          >
            <app-bank-dropdown
              [accounts]="accounts"
              [setValue]="setValue"
              otherStyles="!w-full"
              [id]="ffSender.inputId"
              [attr.aria-invalid]="ffSender.hasError"
              [attr.aria-describedby]="ffSender.hasError ? ffSender.descId + ' ' + ffSender.msgId : ffSender.descId"
            ></app-bank-dropdown>
          </app-form-field>
        </div>
      </div>

      <!-- name / note -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item pb-6 pt-5">
          <div class="payment-transfer_form-content">
            <h3 class="text-14 font-medium text-gray-700">Transfer Note (Optional)</h3>
            <p class="text-12 font-normal text-gray-600">
              Please provide any additional information or instructions related to the transfer
            </p>
          </div>

          <app-form-field
            [control]="form.get('name')"
            #ffName="appFormField"
          >
            <textarea
              placeholder="Write a short note here"
              class="input-class"
              formControlName="name"
              [id]="ffName.inputId"
              [attr.aria-invalid]="ffName.hasError"
              [attr.aria-describedby]="ffName.hasError ? ffName.descId + ' ' + ffName.msgId : ffName.descId"
            ></textarea>
          </app-form-field>
        </div>
      </div>

      <!-- section title -->
      <div class="payment-transfer_form-details">
        <h2 class="text-18 font-semibold text-gray-900 ">Bank account details</h2>
        <p class="text-16 font-normal text-gray-600">Enter the bank account details of the recipient</p>
      </div>

      <!-- email -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item mb-8 pt-4">
          <app-form-field
            label="Recipient's Email Address"
            [control]="form.get('email')"
            #ffEmail="appFormField"
          >
            <input
              type="email"
              placeholder="ex: johndoe@gmail.com"
              class="input-class  pt-2 mb-6"
              formControlName="email"
              [id]="ffEmail.inputId"
              [attr.aria-invalid]="ffEmail.hasError"
              [attr.aria-describedby]="ffEmail.hasError ? ffEmail.descId + ' ' + ffEmail.msgId : ffEmail.descId"
            />
          </app-form-field>
        </div>
      </div>

      <!-- sharableId (chez toi = un identifiant public de compte; garde-le si tu veux) -->
      <div class="border-t border-gray-200">
        <div class="payment-transfer_form-item  mb-8 pt-4">
          <app-form-field
            label="Receiver's Public Account Id"
            [control]="form.get('sharableId')"
            #ffShare="appFormField"
          >
            <input
              type="text"
              placeholder="Enter the public account number"
              class="input-class"
              formControlName="sharableId"
              [id]="ffShare.inputId"
              [attr.aria-invalid]="ffShare.hasError"
              [attr.aria-describedby]="ffShare.hasError ? ffShare.descId + ' ' + ffShare.msgId : ffShare.descId"
            />
          </app-form-field>
        </div>
      </div>

      <!-- amount -->
      <div class="border-y border-gray-200">
        <div class="payment-transfer_form-item mb-8 pt-4">
          <app-form-field
            label="Amount"
            [control]="form.get('amount')"
            #ffAmount="appFormField"
          >
            <input
              type="text"
              placeholder="ex: 5.00"
              class="input-class"
              formControlName="amount"
              [id]="ffAmount.inputId"
              [attr.aria-invalid]="ffAmount.hasError"
              [attr.aria-describedby]="ffAmount.hasError ? ffAmount.descId + ' ' + ffAmount.msgId : ffAmount.descId"
            />
          </app-form-field>
        </div>
      </div>

      <!-- submit -->
      <div class="payment-transfer_btn-box">
        <button type="submit" class="payment-transfer_btn">
          <ng-container *ngIf="isLoading(); else idle">
            <span class="animate-spin inline-block h-4 w-4 mr-2 border border-current border-t-transparent rounded-full"></span>
            Sending...
          </ng-container>
          <ng-template #idle>Transfer Funds</ng-template>
        </button>

        
      </div>
    </form>
  `,
})
export class PaymentTransferFormComponent {
  @Input({ required: true }) accounts: BankOption[] = [];


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  private banksApi = new BanksApi(this.http);
  private transfersApi = new TransfersApi(this.http);
  private txsApi = new TransactionsApi(this.http);

  isLoading = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.minLength(4)]],                 // optionnel comme Zod
    amount: ['', [Validators.required, Validators.minLength(1)]],
    senderBank: ['', [Validators.required, Validators.minLength(1)]], // ici on stocke l'ID de compte sélectionné (appwriteItemId chez toi)
    sharableId: ['', [Validators.required, Validators.minLength(1)]], // id public du compte destinataire (ton choix)
  });

  // Permet à <app-bank-dropdown> de setter la valeur comme dans le code Next
  setValue = (key: string, value: any) => this.form.get(key)?.setValue(value);

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true);

    const { email, name, amount, senderBank, sharableId } = this.form.value as any;

    try {
      // 1) Récupérer la banque du destinataire via son "public account id"
      const receiverBank = await firstValueFrom(
        this.banksApi.getBankByAccountId(String(sharableId))
      );
      // 2) Récupérer la banque de l'expéditeur via l'id choisi dans le dropdown
      const senderBankDoc = await firstValueFrom(
        this.banksApi.getBank(String(senderBank))
      );

      // 3) Créer le transfert (API perso)
      const transfer = await firstValueFrom(
        this.transfersApi.createTransfer({
          sourceAccountId: String(senderBank),                 // ici on envoie l'id du compte source
          destinationAccountId: String(receiverBank.accountId),// et l'id du compte destinataire
          amount: String(amount),
        })
      );

      // 4) Créer la transaction (journal)
      if (transfer?.id) {
        const newTx = await firstValueFrom(
          this.txsApi.createTransaction({
            name: String(name ?? ''),
            amount: String(amount),
            senderId: String(senderBankDoc.userId),
            senderBankId: String(senderBankDoc.id),
            receiverId: String(receiverBank.userId),
            receiverBankId: String(receiverBank.bankId),
            email: String(email),
          })
        );

        if (newTx?.id) {
          this.form.reset();
          this.router.navigateByUrl('/');
        }
      }
    } catch (e) {
      console.error('Submitting create transfer request failed:', e);
    } finally {
      this.isLoading.set(false);
    }
  }
}
