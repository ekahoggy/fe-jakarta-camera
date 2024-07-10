import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  constructor() { }

  checkPasswordStrength(password: string): { strength: string, message: string } {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (length >= 8) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;

    let strengthMessage = '';
    let strengthClass = '';
    switch (strength) {
      case 0:
      case 1:
        strengthClass = 'weak';
        strengthMessage = 'Lemah';
        break;
      case 2:
      case 3:
        strengthClass = 'medium';
        strengthMessage = 'Sedang';
        break;
      case 4:
      case 5:
        strengthClass = 'strong';
        strengthMessage = 'Kuat';
        break;
    }
    return { strength: strengthClass, message: strengthMessage };
  }
}
