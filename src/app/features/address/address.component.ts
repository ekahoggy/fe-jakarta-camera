import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
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