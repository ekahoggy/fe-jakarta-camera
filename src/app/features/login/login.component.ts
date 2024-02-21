import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any = {};
 
  constructor(
    private globalService: GlobalService,
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
    // Di sini Anda bisa menambahkan logika untuk memeriksa kredensial pengguna
    this.globalService.DataPost('/')
  }
}
