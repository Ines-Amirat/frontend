// src/app/components/category/category.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from '../progress/progress.component';
import { CategoryCount } from '../../../core/models';
import { cn } from '../../../core/utils/utils';
import { TOP_CATEGORY_STYLES } from '../../../core/constants';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ProgressComponent],
  template: `
    <div [ngClass]="cn('gap-[18px] flex p-4 rounded-xl', style.bg)">
      <figure [ngClass]="cn('flex-center size-10 rounded-full', style.circleBg)">
        <img [src]="style.icon" width="20" height="20" [alt]="category.name" />
      </figure>

      <div class="flex w-full flex-1 flex-col gap-2">
        <div class="text-14 flex justify-between">
          <h2 [ngClass]="cn('font-medium', style.text.main)">
            {{ category.name }}
          </h2>
          <h3 [ngClass]="cn('font-normal', style.text.count)">
            {{ category.count }}
          </h3>
        </div>

        <app-progress
          [value]="progressValue"
          [class.h-2]="true"
          [class.w-full]="true"
          [ngClass]="style.progress.bg"
          [indicatorClassName]="style.progress.indicator"
        ></app-progress>
      </div>
    </div>
  `,
})
export class CategoryComponent implements OnInit {
  @Input() category!: CategoryCount;

  style: any = {};
  progressValue = 0;

  ngOnInit() {
    // récupère les styles depuis les constantes
    this.style =
      TOP_CATEGORY_STYLES[
        this.category.name as keyof typeof  TOP_CATEGORY_STYLES
      ] ||  TOP_CATEGORY_STYLES.default;

    // calcule la valeur du progress bar
    this.progressValue =
      (this.category.count / (this.category.totalCount || 1)) * 100;
  }

  // Angular n’a pas clsx, donc cn() est un helper défini dans utils.ts
  cn(...classes: string[]) {
    return cn(...classes);
  }
}
