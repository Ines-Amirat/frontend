import { Component, Input, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective } from '../ui/button.directive';
import { InputComponent } from '../ui/input/input.component';
import { LabelComponent } from '../ui/label/label.component';
import { FormFieldComponent } from '../ui/form/form.component';

type AuthType = 'sign-in' | 'sign-up';
type User = { id: string; firstName: string; email: string } | null;


@Component({
  standalone: true,
  selector: 'app-auth-form',
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    ButtonDirective, InputComponent, LabelComponent, FormFieldComponent
  ],
  templateUrl: './auth-form.component.html',
   styleUrls: ['./auth-form.component.css'],
   
})
export class AuthFormComponent implements OnInit {
  @Input({ required: true }) type!: AuthType;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoading = signal(false);
  user = signal<User>(null);
  isSignUp = computed(() => this.type === 'sign-up');

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    address1: [''],
    city: [''],
    state: [''],
    postalCode: [''],
    dateOfBirth: [''],
    ssn: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit() {
    if (this.isSignUp()) {
      this.form.get('firstName')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('lastName')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('address1')?.addValidators([Validators.required, Validators.maxLength(50)]);
      this.form.get('city')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('state')?.addValidators([Validators.required, Validators.maxLength(2)]);
      this.form.get('postalCode')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('dateOfBirth')?.addValidators([Validators.required]);
      this.form.get('ssn')?.addValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
      this.form.updateValueAndValidity({ emitEvent: false });
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true);
    const v = this.form.getRawValue();

    setTimeout(() => {
      if (this.isSignUp()) {
        this.user.set({ id: 'u_1', firstName: v.firstName ?? '', email: v.email ?? '' });
        this.isLoading.set(false);
      } else {
        this.isLoading.set(false);
        this.router.navigateByUrl('/');
      }
    }, 700);
  }

  err(name: string, key?: string) {
    const c = this.form.get(name);
    if (!c || !c.touched || !c.invalid) return null;
    const e = c.errors || {};
    if (e['required']) return 'Required';
    if (e['email']) return 'Invalid email';
    if (e['minlength']) return `Min ${e['minlength'].requiredLength} chars`;
    if (e['maxlength']) return `Max ${e['maxlength'].requiredLength} chars`;

    return 'Invalid';
  }
}
