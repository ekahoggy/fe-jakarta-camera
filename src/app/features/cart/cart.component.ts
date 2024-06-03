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
  subTotal: number = 0;
  grandTotal: number = 0;
  auth: any;
  totalCart: number = 0;

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.auth = this.globalService.getAuth()['user'];
    this.getData();
  }

  getData() {
    let params = {
      'user_id': this.auth.id
    }
    this.globalService.DataGet('/cart/get', params).subscribe((res: any) => {
      this.listData = res.data;
      this.totalCart = res.data.length;
      this.kalkulasi();
    });
  }

  reduceTotal(i: number) {
    if (this.listData[i].quantity > 1) {
      this.listData[i].quantity--
      this.changeCart(this.listData[i]);
    }
  }

  addTotal(i: number) {
    this.listData[i].quantity++
    this.changeCart(this.listData[i]);
  }

  changeQuantity(i: number) {
    if (this.listData[i].quantity === '0') {
      this.listData[i].quantity = 1;
      this.changeCart(this.listData[i]);
    }
  }

  changeCart(model: any) {
    this.loading = true;
    let data = Object.assign(model);
    this.globalService.DataPost('/cart/update', data).subscribe((res: any) => {
      this.kalkulasi();
      this.loading = false;
    });
  }

  deleteCart(id: string) {
    Swal.fire({
      title: "Apakah kamu yakin ingin menghapus produk ini di keranjang?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Batal",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        this.globalService.DataPost('/cart/delete', { id: id }).subscribe((res: any) => {
          this.getData();
        });
      }
    });
  }

  kalkulasi() {
    this.subTotal = 0;
    this.grandTotal = 0;
    let hargaDiskon = 0;
    if (this.listData.length > 0) {
      this.listData.forEach((val: any) => {
        this.subTotal += (val.harga * val.quantity)
        this.grandTotal += (val.harga * val.quantity)
      })
    }
  }
}
