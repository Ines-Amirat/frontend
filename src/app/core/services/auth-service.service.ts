// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private _user = signal<User | null>({
    $id: 'demo', email: 'lyna@gmail.com', userId: 'demo',
    dwollaCustomerUrl: '', dwollaCustomerId: '',
    firstName: 'Ines', lastName: 'lyna',
    address1: '', city: '', state: '', postalCode: '', dateOfBirth: '', ssn: ''
  }); // TODO: remplace par ton vrai chargement

  /** Signal en lecture seule que tes composants peuvent appeler avec user() */
  user = this._user.asReadonly();

  logout() { this._user.set(null); }
  setUser(u: User | null) { this._user.set(u); }
}
