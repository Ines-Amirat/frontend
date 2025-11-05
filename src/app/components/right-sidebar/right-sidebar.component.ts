// src/app/components/nav/right-sidebar/right-sidebar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankCardComponent } from '../bank/bank-card/bank-card.component';
import { Account, Bank, CategoryCount, Transaction, User } from '../../core/models';
import { countTransactionCategories } from '../../core/utils/utils';
import { CategoryComponent } from '../ui/category/category.component';


@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [ RouterModule, BankCardComponent, CategoryComponent],
  template: `
    <aside class="right-sidebar">
      <!-- 🧑‍💼 Profil utilisateur -->
      <section class="flex flex-col pb-8">
        <div class="profile-banner"></div>
        <div class="profile">
          <div class="profile-img">
            <span class="text-5xl font-bold text-blue-500">
              {{ user?.firstName?.[0] }}
            </span>
          </div>

          <div class="profile-details">
            <h1 class="profile-name">
              {{ user?.firstName }} {{ user?.lastName }}
            </h1>
            <p class="profile-email">{{ user?.email }}</p>
          </div>
        </div>
      </section>

      <!-- 🏦 Banks -->
      <section class="banks">
        <div class="flex w-full justify-between">
          <h2 class="header-2">My Banks</h2>

          <a routerLink="/" class="flex gap-2 items-center">
            <img src="assets/icons/plus.svg" width="20" height="20" alt="plus icon" />
            <h2 class="text-14 font-semibold text-gray-600">Add Bank</h2>
          </a>
        </div>

        <div *ngIf="banks.length > 0" class="relative flex flex-col items-center justify-center gap-5">
          <div class="relative z-10">
            <app-bank-card
              [account]="banks[0]"
              [userName]="user?.firstName + ' ' + user?.lastName"
              [showBalance]="false"
            ></app-bank-card>
          </div>

          <div *ngIf="banks[1]" class="absolute right-0 top-8 z-0 w-[90%]">
            <app-bank-card
              [account]="banks[1]"
              [userName]="user?.firstName + ' ' + user?.lastName"
              [showBalance]="false"
            ></app-bank-card>
          </div>
        </div>

        <!-- 📊 Catégories -->
        <div class="mt-10 flex flex-col gap-6">
          <h2 class="header-2">Top Categories</h2>

          <div class="space-y-5">
            <app-category
              *ngFor="let category of categories; trackBy: trackByName"
              [category]="category"
            ></app-category>
          </div>
        </div>
      </section>
    </aside>
  `,
})
export class RightSidebarComponent implements OnInit {
  @Input() user!: User;
  @Input() transactions: Transaction[] = [];
  @Input({ required: true }) banks!: Account[];


  categories: CategoryCount[] = [];

  ngOnInit(): void {
    this.categories = countTransactionCategories(this.transactions);
  }

  trackByName(_: number, item: CategoryCount) {
    return item.name;
  }
}
