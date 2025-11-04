import { Component, Input, signal } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-copy',
  standalone: true,
  imports: [NgIf],
  template: `
    <button
      class="mt-3 flex max-w-[320px] gap-4 rounded-md border border-gray-300 bg-gray-50
             px-3 py-2 text-xs font-medium text-black-2 hover:bg-gray-100 transition"
      (click)="copyToClipboard()"
    >
      <p class="line-clamp-1 w-full max-w-full">{{ title }}</p>

      <ng-container *ngIf="!hasCopied(); else copiedIcon">
        <!-- Copy icon -->
        <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             class="mr-1 size-4">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      </ng-container>

      <ng-template #copiedIcon>
        <!-- Check icon -->
        <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             class="mr-1 size-4 text-green-600">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </ng-template>
    </button>
  `,
})
export class CopyComponent {
  @Input() title = '';
  hasCopied = signal(false);

  async copyToClipboard() {
    await navigator.clipboard.writeText(this.title);
    this.hasCopied.set(true);
    setTimeout(() => this.hasCopied.set(false), 2000);
  }
}
