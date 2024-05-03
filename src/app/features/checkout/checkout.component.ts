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

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let params = {
      'user_id': this.globalService.getAuth()['user']['id']
    }
    this.globalService.DataGet('/cart/get', params).subscribe((res:any ) => {
      this.listCart = res.data;

      this.subtotal = 0;
      this.total = 0;
      this.listCart.forEach((val:any) => {
        this.subtotal += (val.harga * val.quantity)
        this.total = this.subtotal;
      })
    });
  }
}
