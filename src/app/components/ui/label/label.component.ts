import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  template: `
    <label
      [attr.for]="for"
      class="text-sm font-medium leading-none
             peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  @Input() for?: string;
}
