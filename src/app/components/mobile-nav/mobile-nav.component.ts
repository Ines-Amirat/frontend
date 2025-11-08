// src/app/features/dashboard/layout/mobile-nav.component.ts
import { Component, Input, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent, FooterUser } from '../footer/footer.component';
import { CommonModule } from '@angular/common';


type Link = { label: string; route: string; imgURL: string; };
const LINKS: Link[] = [
  { label: 'Home', route: '/',                    imgURL: '/icons/home.svg' },
  { label: 'My Banks', route: '/my-banks',        imgURL: '/icons/bank.svg' },
  { label: 'Transaction History', route: '/transaction-history', imgURL: '/icons/transaction.svg' },
  { label: 'Transfer Funds', route: '/payment-transfer', imgURL: '/icons/transfer.svg' },
  { label: 'Connect Bank', route: '/connect-bank', imgURL: '/icons/link.svg' },
];

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink, RouterLinkActive, FooterComponent,CommonModule],
  template: `
    <section class="w-full max-w-[264px]">
      <button class="cursor-pointer" (click)="open.set(true)">
        <img src="/icons/hamburger.svg" width="30" height="30" alt="hamburger icon" />
      </button>

      <div *ngIf="open()" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/30" (click)="open.set(false)"></div>
        <aside class="absolute left-0 top-0 h-full w-[264px] bg-white border-none p-4">
          <a routerLink="/" class="flex cursor-pointer items-center gap-1 px-4" (click)="open.set(false)">
            <img src="assets/icons/logo.svg" alt="logo" width="34" height="34" />
            <h1 class="text-26 font-ibm-plex-serif font-bold text-black-1">HORIZON</h1>
          </a>

          <div class="mobilenav-sheet">
            <nav class="flex h-full flex-col gap-6 pt-16 text-white">
              <a *ngFor="let item of links"
                 [routerLink]="item.route"
                 routerLinkActive="bg-bank-gradient"
                 [routerLinkActiveOptions]="{ exact:false }"
                 (click)="open.set(false)"
                 class="mobilenav-sheet_close w-full flex items-center gap-3 px-3 py-2 rounded-lg">
                <img [src]="item.imgURL" [alt]="item.label" width="20" height="20"
                     [ngClass]="{'brightness-[3] invert-0': false}" />
                <p class="text-16 font-semibold text-black-2">{{ item.label }}</p>
              </a>

              <!-- PlaidLink placeholder -->
              <button class="sidebar-link hover:opacity-90" (click)="open.set(false)">Connect Bank (Plaid)</button>
            </nav>

            <app-footer [user]="user" type="mobile" />
          </div>
        </aside>
      </div>
    </section>
  `,
})
export class MobileNavComponent {
  @Input() user!: FooterUser;
  links = LINKS;
  open = signal(false);
}
