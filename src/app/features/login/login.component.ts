import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  apiURL: string = environment.api
  model: any = {};
  isError: boolean = false;
  isPesan: string = '';
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.empty();
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
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

  google(modal){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // window.open('http://localhost:8000/google/redirect');
    // this.modalService.open(modal, { size: 'md', backdrop: 'static'});
    // this.http.get(this.apiURL + '/google/redirect', {}).subscribe((res: any) => {
    //   if (res.status_code == 200) {
    //     const userData = btoa(JSON.stringify(res.data))
    //     localStorage.setItem('session', userData)
    //     window.location.href = '/home';
    //   }
    // }, (error: any) => {
    //   this.isError = true;
    //   this.isPesan = 'Email or password is wrong!';
    // });
  }
}
