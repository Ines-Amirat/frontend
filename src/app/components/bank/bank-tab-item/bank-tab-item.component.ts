import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { cn, formUrlQuery } from '../../../core/utils/utils';
import { BankAccount } from '../../../core/models';



@Component({
  selector: 'app-bank-tab-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      (click)="handleBankChange()"
      [ngClass]="cn('banktab-item', { 'border-blue-600': isActive() })"
    >
      <p
        [ngClass]="cn('text-16 line-clamp-1 flex-1 font-medium text-gray-500', {
          'text-blue-600': isActive()
        })"
      >
        {{ account?.name }}
      </p>
    </div>
  `,
})
export class BankTabItemComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input({ required: true }) account!: BankAccount;
  @Input({ required: true }) appwriteItemId!: string;

  cn = cn;

  /** État actif : même ID que celui passé en paramètre */
  isActive = computed(() => this.appwriteItemId === this.account?.id);

  /** Changement de banque → met à jour le query param ?id=... */
  handleBankChange() {
    if (!this.account?.id) return;

    const currentParams = window.location.search.substring(1); // ex: "page=1&id=123"
    const newUrl = formUrlQuery({
      params: currentParams,
      key: 'id',
      value: this.account.id,
    });

    // équivalent de router.push(newUrl, { scroll: false })
    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }
}
