import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  listCart: any;
  loading: boolean = false;
  subtotal: number = 0;
  total: number = 0;
  model: any = {};
  userId: string = "";

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.userId = this.globalService.getAuth()['user']['id'];
    this.getData();
    this.getUserDetail();
  }

  getData() {
    this.globalService.DataGet('/cart/get', { user_id: this.userId}).subscribe((res:any ) => {
      this.listCart = res.data;

      this.subtotal = 0;
      this.total = 0;
      this.listCart.forEach((val:any) => {
        this.subtotal += (val.harga * val.quantity)
        this.total = this.subtotal;
      })
    });
  }

  getUserDetail() {
    let params = {
      user_id: this.userId,
      active: 1
    }
    this.globalService.DataGet('/address/main', params).subscribe((res:any ) => {
      this.model.email = this.globalService.getAuth()['user']['email']; 

    });
  }
}
