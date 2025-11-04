// src/app/features/dashboard/layout/sidebar.component.ts
import { Component, Input } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';



import { SIDEBAR_LINKS } from '../../core/constants';
import { FooterComponent, FooterUser } from '../footer/footer.component';
import { PlaidLinkComponent } from '../ui/plaid-link/plaid-link.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink, RouterLinkActive, FooterComponent, PlaidLinkComponent],
  template: `
    <section class="sidebar">
      <nav class="flex flex-col gap-4">
        <a routerLink="/" class="mb-12 flex cursor-pointer items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="logo" width="34" height="34" class="size-[24px] max-xl:size-14" />
          <h1 class="sidebar-logo">Horizon</h1>
        </a>

        <a *ngFor="let item of links"
           [routerLink]="item.route"
           #rla="routerLinkActive"
           routerLinkActive="bg-bank-gradient"
           [routerLinkActiveOptions]="{ exact:false }"
           class="sidebar-link">
          <div class="relative size-6">
            <img [src]="item.imgURL" [alt]="item.label"
                 class="absolute inset-0 h-full w-full object-contain"
                 [ngClass]="{ 'brightness-[3] invert-0': rla.isActive }" />
          </div>
          <p class="sidebar-label" [ngClass]="{ '!text-white': rla.isActive }">
            {{ item.label }}
          </p>
        </a>

        <!-- ✅ PlaidLink Angular equivalent -->
        <app-plaid-link [user]="user" variant="ghost" />
      </nav>

      <app-footer [user]="user" type="desktop" />
    </section>
  `,
})
export class SidebarComponent {
  @Input() user!: FooterUser;
  links = SIDEBAR_LINKS;
}
