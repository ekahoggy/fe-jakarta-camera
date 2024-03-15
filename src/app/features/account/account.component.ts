import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  model:any = {};
  adress: any = {};
 
  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.empty();
    this.model.name = this.globalService.getAuth()['name'];
  }

  empty() {
    this.model = {
      email: '',
      password: ''
    }
  }

  logout() {
    this.globalService.destroyAuth();
  }

  getAddress() {
    this.globalService.DataGet('/account/active-address', {}).subscribe((res:any) => {
      this.adress = res.data;
    })
  }
}