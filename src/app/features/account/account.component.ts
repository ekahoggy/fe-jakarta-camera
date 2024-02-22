import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
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