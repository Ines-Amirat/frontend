import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { formUrlQuery } from '../../../core/utils/utils';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="flex justify-between gap-3">
      <button
        type="button"
        class="p-0 hover:bg-transparent inline-flex items-center gap-2 disabled:opacity-50"
        (click)="handleNavigation('prev')"
        [disabled]="page <= 1"
      >
        <img
          ngSrc="/icons/arrow-left.svg"
          width="20"
          height="20"
          alt="arrow"
          class="mr-2"
        />
        Prev
      </button>

      <p class="text-14 flex items-center px-2">
        {{ page }} / {{ totalPages }}
      </p>

      <button
        type="button"
        class="p-0 hover:bg-transparent inline-flex items-center gap-2 disabled:opacity-50"
        (click)="handleNavigation('next')"
        [disabled]="page >= totalPages"
      >
        Next
        <img
          ngSrc="/icons/arrow-left.svg"
          width="20"
          height="20"
          alt="arrow"
          class="ml-2 -scale-x-100"
        />
      </button>
    </div>
  `,
})
export class PaginationComponent {
  private router = inject(Router);

  @Input({ required: true }) page!: number;
  @Input({ required: true }) totalPages!: number;

  handleNavigation(type: 'prev' | 'next') {
    const pageNumber = type === 'prev' ? this.page - 1 : this.page + 1;

    const newUrl = formUrlQuery({
      params: window.location.search.slice(1), // équiv. useSearchParams().toString()
      key: 'page',
      value: String(pageNumber),
    });

    // équiv. router.push(newUrl, { scroll: false })
    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }
}
