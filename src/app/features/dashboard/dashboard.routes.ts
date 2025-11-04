
// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MyBanksComponent } from './pages/my-banks/my-banks.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { PaymentTransferComponent } from './pages/payment-transfer/payment-transfer.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Home' },
      { path: 'my-banks', component: MyBanksComponent, title: 'My Banks' },
      { path: 'transaction-history', component: TransactionHistoryComponent, title: 'Transaction History' },
      { path: 'payment-transfer', component: PaymentTransferComponent, title: 'Transfer Funds' },
    ],
  },
];

