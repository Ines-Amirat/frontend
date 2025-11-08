import { Injectable, signal } from '@angular/core';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {

  // ✅ MOCK USER avec un vrai UUID (correspond à ce que le backend attend)
  private _user = signal<User | null>({
    id: '11111111-1111-1111-1111-111111111111',   // <--- IMPORTANT
    email: 'test@demo.com',
    userId: 'u1',                                 // peut rester, mais non utilisé par le backend
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    firstName: 'Ines',
    lastName: 'Amirat',
    address1: '123 Demo St',
    city: 'Montpellier',
    state: 'FR',
    postalCode: '34000',
    dateOfBirth: '2000-01-01',
    ssn: '1111'
  });

  /** Lecture seule */
  user = this._user.asReadonly();

  /** Permettra plus tard de mettre le vrai user après login */
  setUser(u: User | null) {
    this._user.set(u);
  }

  logout() {
    this._user.set(null);
  }
}
