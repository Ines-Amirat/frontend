// src/app/features/dashboard/layout/footer.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface FooterUser { firstName: string; lastName: string; email: string; }

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer cursor-pointer" (click)="handleLogOut()">
      <div [class.footer_name]="type==='desktop'" [class.footer_name-mobile]="type==='mobile'">
        <p class="text-xl font-bold text-gray-700">{{ user?.firstName?.[0] }}</p>
      </div>

      <div class="flex-1" [class.footer_email]="type==='desktop'" [class.footer_email-mobile]="type==='mobile'">
        <h1 class="text-14 font-semibold text-gray-700">
          {{ user?.firstName }} {{ user?.lastName }}
        </h1>
        <p class="text-14 truncate font-normal text-gray-600">{{ user?.email }}</p>
      </div>

      <div [class.footer_image]="type==='desktop'" [class.footer_image-mobile]="type==='mobile'">
        <img src="assets/icons/logout.svg" alt="logout" />
      </div>
    </footer>
  `,
})
export class FooterComponent {
  @Input() user!: FooterUser;
  @Input() type: 'desktop'|'mobile' = 'desktop';

  constructor(private router: Router) {}

  async handleLogOut() {
    // TODO: remplace par appel réel (logoutAccount)
    // await this.auth.logout();
    this.router.navigateByUrl('/sign-in');
  }
}
