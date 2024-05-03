import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  listData: any;
  loading: boolean = false;

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
      this.listData = res.data;
    });
  }

  reduceTotal(i:number) {
    if (this.listData[i].quantity > 1) {
      this.listData[i].quantity--
      this.changeCart(this.listData[i]);
    }
  }

  addTotal(i:number) {
    this.listData[i].quantity++
    this.changeCart(this.listData[i]);
  }

  changeQuantity(i:number) {
    if (this.listData[i].quantity === '0') {
      this.listData[i].quantity = 1;
      this.changeCart(this.listData[i]);
    }
  }

  changeCart(model:any) {
    this.loading = true;
    let data = Object.assign(model);
    this.globalService.DataPost('/cart/update', data).subscribe((res:any ) => {
      this.getData();
      this.loading = false;
    });
  }
  
  deleteCart(id:string) {
    Swal.fire({
      title: "Are you sure you want to remove this product from your cart?",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      confirmButtonColor: "#dc3545",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        this.globalService.DataPost('/cart/delete', {id:id}).subscribe((res:any ) => {
          this.getData();
        });
      } 
    });
  }
}
