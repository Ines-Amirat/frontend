// src/app/components/common/header-box/header-box.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-box',
  standalone: true,
  template: `
    <div class="header-box">
      <h1 class="header-box-title">
        {{ title }}
        <span *ngIf="type === 'greeting'" class="text-bankGradient"> {{ user }} </span>
      </h1>
      <p class="header-box-subtext">{{ subtext }}</p>
    </div>
  `,
})
export class HeaderBoxComponent {
  @Input() type: 'title' | 'greeting' = 'title';
  @Input() title!: string;
  @Input() subtext!: string;
  @Input() user?: string;
}

