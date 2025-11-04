import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';


import { cn } from '../../../core/utils/utils';
import { TRANSACTION_CATEGORY_STYLES } from '../../../core/constants';


@Component({
  selector: 'app-category-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="cn('category-badge', style().borderColor, style().chipBackgroundColor)">
      <div [ngClass]="cn('size-2 rounded-full', style().backgroundColor)"></div>
      <p [ngClass]="cn('text-[12px] font-medium', style().textColor)">{{ category }}</p>
    </div>
  `,
})
export class CategoryBadgeComponent {
  @Input({ required: true }) category!: string;

  cn = cn;

  style = computed(() => {
    const map = TRANSACTION_CATEGORY_STYLES as Record<string, any>;
    return map[this.category] ?? map['default'];
  });
}
