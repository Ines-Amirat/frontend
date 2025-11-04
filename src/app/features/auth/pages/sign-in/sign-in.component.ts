

import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../../components/auth-form/auth-form.component';

@Component({
  standalone: true,
  selector: 'app-sign-in-page',
  imports: [AuthFormComponent],
  template: `
               <app-auth-form type="sign-in" class="pt-20 mt-40 "></app-auth-form>
             `,
})
export class SignInComponent { }
