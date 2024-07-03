import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordStrengthService } from 'src/app/core/password-strength/password-strength.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    model:any = {};
    loading: boolean = false;
    passwordStrength: string = "";
    passwordStrengthMessage: string = "";

    constructor(
        private passwordStrengthService: PasswordStrengthService,
        private route: ActivatedRoute,
        private globalService: GlobalService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.model.token = params['token']
        });
    }

    checkPasswordStrength() {
        const result = this.passwordStrengthService.checkPasswordStrength(this.model.password);
        this.passwordStrength = result.strength;
        this.passwordStrengthMessage = result.message;
    }

    postResetPassword() {
        let params = Object.assign(this.model);
        this.globalService.DataPost('/auth/reset-password', params).subscribe((res:any) => {

        }, (error: any) => {

        })
    }
}
