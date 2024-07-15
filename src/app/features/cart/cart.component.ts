import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends MetaDataService implements OnInit {
  listData: any;
  listDataTerhapus: any = [];
  loading: boolean = false;
  subTotal: number = 0;
  grandTotal: number = 0;
  auth: any;
  totalCart: number = 0;
  disabledPlus: boolean = false;
  disabledProses: boolean = true;

    constructor(
        private globalService: GlobalService,
        titleService: Title,
        metaService: Meta
    ) { 
        super(titleService, metaService);
    }

  ngOnInit() {
    this.updateTags('Keranjang', 'cart');
    this.auth = this.globalService.getAuth()['user'];
    this.getData();
  }

  getData() {
    let params = {
      'user_id': this.auth.id
    }
    this.globalService.DataGet('/cart/get', params).subscribe((res: any) => {
      this.listData = res.data;
      this.listDataTerhapus = res.stok_habis;
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
    if(this.listData[i].quantity >= this.listData[i].sisa_stok){
      this.listData[i].quantity = this.listData[i].sisa_stok;
      this.changeCart(this.listData[i]);
    }else if (this.listData[i].quantity === 0) {
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
    if (this.listData.length > 0) {
      this.listData.forEach((item: any) => {
        if(item.sisa_stok <= item.quantity){
          item.disabled = true;
        }
        else{
          item.disabled = false;
        }
      })

      const filteredData = this.listData.filter(item => item.sisa_stok !== 0);
      this.listData = filteredData;

      this.listData.forEach(item => {
        this.subTotal += (item.harga * item.quantity)
        this.grandTotal += (item.harga * item.quantity)
      });
    }

    if(this.grandTotal > 0){
      this.disabledProses = false;
    }
  }

}
