import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.development';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends MetaDataService implements OnInit {
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
        private socialAuthService: SocialAuthService,
        titleService: Title,
        metaService: Meta
    ) { 
        super(titleService, metaService);
    }

  ngOnInit(): void {
    this.updateTags();
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
