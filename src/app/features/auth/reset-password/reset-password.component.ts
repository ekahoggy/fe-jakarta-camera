import { Component, OnInit } from '@angular/core';
import { PasswordStrengthService } from 'src/app/core/password-strength/password-strength.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    password:string = "";
    password_confirmation:string = "";
    passwordStrength: string = "";
    passwordStrengthMessage: string = "";

    constructor(private passwordStrengthService: PasswordStrengthService) {}

    ngOnInit(): void {
        
    }

    checkPasswordStrength() {
        const result = this.passwordStrengthService.checkPasswordStrength(this.password);
        this.passwordStrength = result.strength;
        console.log(this.passwordStrength)
        this.passwordStrengthMessage = result.message;
      }
}
