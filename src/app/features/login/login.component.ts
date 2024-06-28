import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    isError: boolean = false;
    isPesan: string = '';

    constructor(
        private globalService: GlobalService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.empty();
    }

    empty() {
        this.model = {
            email: '',
            password: ''
        }
    }

    login() {
        let param = Object.assign(this.model);
        this.globalService.DataPost('/auth/login', param).subscribe((res: any) => {
            if (res.status_code == 200) {
                const userData = btoa(JSON.stringify(res.data))
                localStorage.setItem('session', userData)
                window.location.href = '/home';
            }
        }, (error: any) => {
            this.isError = true;
            this.isPesan = 'Email or password is wrong!';
        });
    }

    google() {
        this.globalService.DataGet('/auth/google/callback', {}).subscribe((res: any) => {
            if (res.status_code == 200) {
                const userData = btoa(JSON.stringify(res.data))
                localStorage.setItem('session', userData)
                window.location.href = '/home';
            }
        }, (error: any) => {
            this.isError = true;
            this.isPesan = 'Email or password is wrong!';
        });
    }
}
