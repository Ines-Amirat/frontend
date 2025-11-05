import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  exportAs: 'appTextarea',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      #ta
      class="w-full"
      [disabled]="disabled"
      [attr.placeholder]="placeholder || null"
      [attr.name]="name || null"
      [attr.rows]="rows || null"
      [attr.cols]="cols || null"
      [attr.readonly]="readonly ? '' : null"
      [attr.required]="required ? '' : null"
      [attr.autocomplete]="autocomplete || null"
      [attr.autocapitalize]="autocapitalize || null"
      [attr.spellcheck]="spellcheck"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onTouched()"
    ></textarea>
  `,
})
export class TextareaComponent implements ControlValueAccessor {
  /**
   * ==== API "comme React" ====
   * className => ajouté aux classes de base (équivalent cn(..., className))
   */
  @Input() className = '';

  /**
   * Attributs usuels pass-through
   */
  @Input() placeholder?: string;
  @Input() name?: string;
  @Input() rows?: number;
  @Input() cols?: number;
  @Input() readonly = false;
  @Input() required = false;
  @Input() autocomplete?: string;
  @Input() autocapitalize?: string;
  @Input() spellcheck: boolean | 'false' | 'true' = false;

  @ViewChild('ta', { static: true }) textareaRef!: ElementRef<HTMLTextAreaElement>;

  // === ControlValueAccessor ===
  value = '';
  disabled = false;

  private onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string | null): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(ev: Event) {
    const v = (ev.target as HTMLTextAreaElement).value;
    this.value = v;
    this.onChange(v);
  }

  /**
   * Merge des classes Tailwind (base + className)
   * (équivalent du cn(...) de shadcn/ui)
   */
  @HostBinding('class')
  get hostClasses(): string {
    const base =
      // les mêmes classes que ta version React
      'flex min-h-[80px] w-full rounded-md border border-slate-200 ' +
      'bg-white px-3 py-2 text-sm ring-offset-white ' +
      'placeholder:text-slate-500 ' +
      'focus-visible:outline-none focus-visible:ring-2 ' +
      'focus-visible:ring-slate-950 focus-visible:ring-offset-2 ' +
      'disabled:cursor-not-allowed disabled:opacity-50 ' +
      'dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 ' +
      'dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300';
    return `${base} ${this.className || ''}`.trim();
  }

  // Helpers publics (équivalent "ref") :
  focus() { this.textareaRef?.nativeElement.focus(); }
  get nativeElement(): HTMLTextAreaElement { return this.textareaRef.nativeElement; }
}
