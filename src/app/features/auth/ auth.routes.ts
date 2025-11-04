import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignUpPageComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,          // ← wrapper comme Next layout
    children: [
      { path: 'sign-up', component: SignUpPageComponent},
      { path: 'sign-in', component: SignInComponent},
      { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
    ]
  }
];


