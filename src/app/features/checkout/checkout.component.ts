import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends MetaDataService implements OnInit {
    listCart: any;
    loading: boolean = false;
    subtotal: number = 0;
    total: number = 0;
    model: any = {};
    userId: string = "";
    session: any = {};
    lat: string = '';
    long: string = '';
    alamat: string = '';
    kodepos: string = '';
    kurir: string = '';
    disabled: boolean = true;
    newItems: any = [];

    listVoucher: any = [];
    isAvailableVoucher: boolean = false;
    selectedVoucher: any = {};
    voucher: number = 0;

    listKurir: any = [];
    isAvailableKurir: boolean = false;
    selectedKurir: any = {};
    pengiriman: number = 0;

    constructor(
        private globalService: GlobalService,
        private router: Router,
        private offcanvasService: NgbOffcanvas,
        titleService: Title,
        metaService: Meta
    ) { 
        super(titleService, metaService);
    }

    ngOnInit() {
        this.updateTags('Checkout', 'checkout');
        this.session = this.globalService.getAuth()['user'];
        this.model.email = this.session.email;
        this.userId = this.session.id
        this.getData();
        this.getSetting();
        this.getUserDetail();
        this.getVoucher();
    }

    getData() {
        this.globalService.DataGet('/cart/get', { user_id: this.userId }).subscribe((res: any) => {
            this.listCart = res.data;
            this.listCart.forEach(val => {
                const p = {
                    "name": val.nama,
                    "description": val.varian1_type + " " + val.varian1 + " " + val.varian2_type + " " + val.varian2,
                    "sku": val.sku,
                    "value": val.grandtotal_price,
                    "length": val.lebar,
                    "width": val.panjang,
                    "height": val.tinggi,
                    "weight": val.berat_varian ? val.berat_varian : val.berat,
                    "quantity": val.quantity
                }
                this.newItems.push(p);
            });
            this.kalkulasi();
        });
    }

    getSetting() {
        this.globalService.DataGet('/public/setting', { kategori: 'A' }).subscribe((res: any) => {
            res.data.forEach(setting => {
                if (setting.name === 'latitude') {
                    this.lat = setting.value;
                }
                if (setting.name === 'longitude') {
                    this.long = setting.value;
                }
                if (setting.name === 'kodepos') {
                    this.kodepos = setting.value;
                }
                if (setting.name === 'alamat') {
                    this.alamat = setting.value;
                }
            });
        })

        this.globalService.DataGet('/public/setting', { kategori: 'K' }).subscribe((res: any) => {
            res.data.forEach(setting => {
                if (setting.name === 'kurir') {
                    this.kurir = setting.value;
                }
            });
        })
    }

    getCourier() {
        const params = {
            "origin_postal_code": this.kodepos,
            "origin_latitude": this.lat,
            "origin_longitude": this.long,
            "destination_postal_code": this.model.postal_code,
            "destination_latitude": this.model.latitude,
            "destination_longitude": this.model.longitude,
            "couriers": this.kurir,
            "items": this.newItems
        };

        this.globalService.DataPost('/public/getRates', params).subscribe((res: any) => {
            this.listKurir = res.data;
        });
    }

    pilihKurir(val) {
        this.pengiriman = val.cost;
        this.selectedKurir = val;
        this.kalkulasi()
        this.isAvailableKurir = true;
        this.offcanvasService.dismiss();
        this.disabled = false;
    }

    getVoucher() {
        let params = {
            jenis: 'produk',
            user_id: this.userId
        }
        this.globalService.DataGet('/public/voucher', params).subscribe((res: any) => {
            this.listVoucher = res.data;
        });
    }

    pilihVoucher(val) {
        this.voucher = val.voucher_value;
        this.selectedVoucher = val;
        this.kalkulasi()
        this.isAvailableVoucher = true;
        this.offcanvasService.dismiss();
    }

    getUserDetail() {
        let params = {
            user_id: this.userId,
            active: 1
        }
        this.globalService.DataGet('/address/main', params).subscribe((res: any) => {
            if (res.data.length > 0) {
                let address = res.data[0];
                this.model = address;
                this.model.email = this.session.email;

                this.getCourier();
            }
        }, (error: any) => {
            this.model.email = this.session.email;
        });
    }

    kalkulasi() {
        this.subtotal = 0;
        this.total = 0;

        const filteredData = this.listCart.filter(item => item.sisa_stok !== 0);
        this.listCart = filteredData;

        this.listCart.forEach(val => {
          val.price = val.harga
          val.subtotal_price = (val.harga * val.quantity)
          val.grandtotal_price = (val.harga * val.quantity)

          this.subtotal += (val.harga * val.quantity);
        });

        if (this.selectedVoucher) {
          if (this.selectedVoucher.type === 'P') {
            this.voucher = (this.selectedVoucher.voucher_value / 100) * this.subtotal;
          }
          if (this.selectedVoucher.type === 'N') {
            this.voucher = this.selectedVoucher.voucher_value;
          }
        }
        this.total = this.subtotal + this.pengiriman - this.voucher;
    }

    checkout() {
        this.loading = true;
        let data = Object.assign(this.model);
        data.user_id = this.userId
        data.total_price = this.subtotal
        data.total_pengiriman = this.pengiriman
        data.total_voucher = this.voucher
        data.grand_total = this.total

        let params = {
            data: data,
            detail: this.listCart,
            kurir: this.selectedKurir,
            voucher: this.selectedVoucher
        }

        this.globalService.DataPost('/order/pay', params).subscribe((res: any) => {
            this.loading = false;
            this.globalService.alertSuccess("Success", "Success create order")
            this.navigatePembayaran(res.link)
        })
    }

    navigatePembayaran(url: string) {
        const param = {
            'url': url,
        };
        const data = btoa(JSON.stringify(param));
        this.router.navigate(['/payment'], { queryParams: { 'data': data } });
    }

    openVoucher(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'bottom' });
    }

    openPengiriman(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'bottom' });
    }

    setKoordinat(event) {
        this.model.latitude = event.lat;
        this.model.longitude = event.long;
    }
}
