import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  ngOnInit(): void {
    this.empty();
  }

  empty() {
    this.model = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
  }

  register() {
    // Di sini Anda bisa menambahkan logika untuk memeriksa kredensial pengguna
    console.log(this.model)
  }
}
