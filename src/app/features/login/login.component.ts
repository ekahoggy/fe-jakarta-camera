import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any = {};

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
    console.log(this.model)
  }
}
