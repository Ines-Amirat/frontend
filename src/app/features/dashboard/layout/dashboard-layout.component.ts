// src/app/features/dashboard/layout/dashboard-layout.component.ts
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MobileNavComponent } from '../../../components/mobile-nav/mobile-nav.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { AuthServiceService } from '../../../core/services/auth-service.service';



@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, MobileNavComponent],
  template: `
    <main class="flex h-screen w-full font-inter">
      <app-sidebar [user]="user()" />
      <div class="flex flex-col size-full">
        <div class="root-layout">
          <img src="/icons/logo.svg" width="30" height="30" alt="menu icon" />
          <div>
            <app-mobile-nav [user]="user()" />
          </div>
        </div>
        <router-outlet />
      </div>
    </main>
  `,
})

export class DashboardLayoutComponent {
  user: any; // will hold the signal from AuthServiceService

  constructor(private readonly auth:AuthServiceService) {
    this.user = this.auth.user; // assign after auth is initialized
  }
}
