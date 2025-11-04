import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-field',
  standalone: true,
   imports: [CommonModule],
   
   
  template: `
    <div class="space-y-2">
      <label *ngIf="label" class="text-sm font-medium leading-none">
        {{ label }}
      </label>

      <ng-content></ng-content>

      <p *ngIf="error" class="text-sm font-medium text-red-500">
        {{ error }}
      </p>
    </div>
  `,
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() control?: AbstractControl | null;

  get error(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) return null;
    const e = this.control.errors;
    if (e['required']) return 'Required';
    if (e['email']) return 'Invalid email';
    if (e['minlength']) return `Min ${e['minlength'].requiredLength} chars`;
    if (e['maxlength']) return `Max ${e['maxlength'].requiredLength} chars`;
    return 'Invalid';
  }
}

