import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    is: any = {};
    error: any = {};

    constructor(
        private globalService: GlobalService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.empty();
        this.is.success = false;
    }

    empty() {
        this.model = {
            name: '',
            username: '',
            email: '',
            password: '',
            phone_code: '+62',
            phone_number: '',
        }
        this.error = {};
    }

    register() {
        let param = Object.assign(this.model);
        this.globalService.DataPost('/auth/register', param).subscribe((res: any) => {
            if (res.status == 'success') {
                this.is.success = true;
                this.empty();
                
                const param = {
                    'email': res.user.email,
                };
                const data = btoa(JSON.stringify(param));
                this.router.navigate(['/verification'], { queryParams: { 'data': data } });
            }
        }, (error: any) => {
            this.error.email = error.error.errors.email;
            this.error.name = error.error.errors.name;
            this.error.phone_number = error.error.errors.phone_number;
        });
    }
}
