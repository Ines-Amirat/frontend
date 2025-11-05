import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

let uid = 0;

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  exportAs: 'appFormField',
  template: `
    <div class="space-y-2">
      <label *ngIf="label"
             class="text-sm font-medium leading-none"
             [attr.for]="inputId">
        {{ label }}
      </label>

      <!-- ICI tu projettes ton input/textarea -->
      <ng-content></ng-content>

      <p *ngIf="description"
         class="text-sm text-slate-500"
         [attr.id]="descId">
        {{ description }}
      </p>

      <p *ngIf="error"
         class="text-sm font-medium text-red-500"
         [attr.id]="msgId">
        {{ error }}
      </p>
    </div>
  `,
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() control?: AbstractControl | null;

  // ids auto pour l’accessibilité
  inputId = `ff-${++uid}`;
  descId  = `${this.inputId}-desc`;
  msgId   = `${this.inputId}-msg`;

  get hasError(): boolean {
    return !!(this.control && this.control.touched && this.control.invalid);
  }

  get error(): string | null {
    const c = this.control;
    if (!c || !c.touched || !c.errors) return null;
    const e = c.errors;
    if (e['required'])  return 'This field is required';
    if (e['email'])     return 'Invalid email address';
    if (e['minlength']) return `Minimum length is ${e['minlength'].requiredLength}`;
    if (e['maxlength']) return `Maximum length is ${e['maxlength'].requiredLength}`;
    if (e['pattern'])   return 'Invalid format';
    return 'Invalid value';
  }
}
