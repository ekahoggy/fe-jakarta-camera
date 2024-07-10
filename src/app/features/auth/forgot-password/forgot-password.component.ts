import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    email:string = "";
    message: string = "";
    success: boolean = false;
    loading: boolean = false;

    constructor(private globalService: GlobalService) {}

    ngOnInit(): void {
        this.empty();
    }

    empty() {
        this.email = "";
        this.success = false;
    }

    sendResetPassword() {
        let params = {
            email: this.email
        }
        this.globalService.DataPost('/auth/forgot-password', params).subscribe((res:any) => {
            this.success = true;
            this.loading = false;
            this.message = "";
        }, (error: any) => {
            this.message = 'Email yang kamu masukkan belum terdaftar';
            this.loading = false;
        })
    }
}
