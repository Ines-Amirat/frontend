// src/app/components/ui/progress/progress.component.ts
import { Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../core/utils/utils';


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Root -->
    <div
      [ngClass]="
        cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800',
          className
        )
      "
    >
      <!-- Indicator -->
      <div
        [ngClass]="
          cn(
            'size-full flex-1 bg-slate-900 transition-all duration-300 dark:bg-slate-50',
            indicatorClassName
          )
        "
        [style.transform]="'translateX(-' + (100 - value) + '%)'"
      ></div>
    </div>
  `,
})
export class ProgressComponent implements OnChanges {
  /** Valeur de progression (0–100) */
  @Input() value: number = 0;

  /** Classes CSS supplémentaires pour le container */
  @Input() className: string = '';

  /** Classes CSS pour l’indicateur */
  @Input() indicatorClassName: string = '';

  cn = cn;

  ngOnChanges(changes: SimpleChanges): void {
    // Force la valeur à rester dans [0, 100]
    if (changes['value']) {
      this.value = Math.min(100, Math.max(0, this.value || 0));
    }
  }
}
