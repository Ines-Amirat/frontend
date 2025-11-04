import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../../components/auth-form/auth-form.component';


@Component({
  standalone: true,
  selector: 'app-sign-up-page',
  imports: [AuthFormComponent],
  template: `<section class="flex-center size-full max-sm:px-6">
               <app-auth-form type="sign-up"></app-auth-form>
             </section>`,
})
export class SignUpPageComponent {}
