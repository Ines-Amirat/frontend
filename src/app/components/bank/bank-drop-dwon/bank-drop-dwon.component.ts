// src/app/components/bank-dropdown/bank-dropdown.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BankAccount } from '../../../core/models';



export interface Account {
  id: string;
  name: string;
  currentBalance: number;
  appwriteItemId: string;
}

export type BankDropdownProps = {
  accounts: Account[];
  setValue?: (name: string, value: string) => void;
  otherStyles?: string;
};

@Component({
  selector: 'app-bank-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inline-flex">
      <!-- Trigger -->
      <label class="sr-only">Select a bank</label>

      <!-- Version simple & robuste avec <select> natif (accessible) -->
      <div class="relative">
        <select
          class="flex h-10 w-full md:w-[300px] items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"
          [ngClass]="otherStyles"
          [value]="selected()?.id || ''"
          (change)="onSelectChange($event)"
        >
          <option value="" disabled hidden>Select a bank to display</option>
          <option *ngFor="let a of accounts" [value]="a.id">
            {{ a.name }} — {{ formatAmount(a.balance, a.currency) }}
          </option>
        </select>

        <!-- petite icône à droite, comme le chevron -->
        <img
          src="assets/icons/credit-card.svg"
          alt="account"
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
        />
      </div>
    </div>

    <!-- Texte courant (comme SelectTrigger) -->
    <p class="mt-2 line-clamp-1 text-left" *ngIf="selected() as s">
      {{ s.name }}
    </p>
  `,
})
export class BankDropdownComponent implements OnInit, OnChanges {
  @Input() accounts: BankAccount[] = [];
  @Input() setValue?: (name: string, value: string) => void;
  @Input() otherStyles = '';


  @Output() changed = new EventEmitter<BankAccount>();


  
  private _selected = signal<BankAccount | null>(null);
  selected = computed(() => this._selected());



  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const fromQuery = this.route.snapshot.queryParamMap.get('id');
    // priorité à l'URL si id présent
    if (fromQuery && this.accounts?.length) {
      const found = this.accounts.find(a => a.id === fromQuery) || null;
      this._selected.set(found ?? this.accounts[0] ?? null);
    } else {
      this._selected.set(this.accounts[0] ?? null);
    }
  }

    ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'] && this.accounts?.length) {
      const cur = this._selected();
      if (!cur || !this.accounts.some(a => a.id === cur.id)) {
        const fromQuery = this.route.snapshot.queryParamMap.get('id');
        if (fromQuery) {
          const found = this.accounts.find(a => a.id === fromQuery) || null;
          this._selected.set(found ?? this.accounts[0] ?? null);
        } else {
          this._selected.set(this.accounts[0] ?? null);
        }
      }
    }
  }

  onSelectChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    const acc = this.accounts.find(a => a.id === id);
    if (!acc) return;

    this._selected.set(acc);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id },
      queryParamsHandling: 'merge',
    });

    if (this.setValue) {
      this.setValue('senderBank', id);
    }

    this.changed.emit(acc);
  }


  formatAmount(amount: number, currency = 'EUR', locale = 'fr-FR') {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
      }).format(amount ?? 0);
    } catch {
      // fallback simple
      return `${amount?.toFixed?.(2) ?? '0.00'} ${currency}`;
    }
  }

  
}
