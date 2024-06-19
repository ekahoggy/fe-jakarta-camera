import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  desc: string = 'description';
  configRekomendasi: any = {};
  model: any = {};
  listProduct: any = [];
  listVariant: any = [];
  varian1: any = '';
  varian1_detail: any = [];
  varian2: any = '';
  varian2_detail: any = [];
  selectVarian1: any = '';
  selectVarian2: any = '';
  activePhoto: string = "";
  selectedVarian: any = null;
  loadingPage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.getProduct(slug);
      this.getFlashSale();
    });
    this.configRekomendasiProduct();
  }

  switchDesc(params: string) {
    this.desc = params;
  }

  onSwiper(swiper: any) { }
  onSlideChange() { }

  configRekomendasiProduct() {
    this.configRekomendasi = {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: true,
      pagination: false,
      scrollbar: { draggable: true },
      breakpoints: {
        100: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    }
  }

  getProduct(slug: string) {
    this.loadingPage = true;
    this.globalService.DataGet('/public/getProdukSlug', { slug: slug }).subscribe((res: any) => {
      this.model = res.data;

      //proses variant
      this.listVariant = this.model.variant.all_varian;
      this.varian1 = this.model.variant.varian1;
      this.varian1_detail = this.model.variant.varian1_detail;
      this.varian2 = this.model.variant.varian2;
      this.varian2_detail = this.model.variant.varian2_detail;

      if (this.varian1_detail.length > 0) {
        this.selectVarian1 = this.varian1_detail[0];
        this.getStok();
      }
      if (this.varian2_detail.length > 0) {
        this.selectVarian2 = this.varian2_detail[0];
        this.getStok();
      }

      this.model.quantity = 1;
      this.activePhoto = this.model.foto;
      this.loadingPage = false;
    })
  }

  pilihVariant1(varian: string) {
    this.selectVarian1 = varian;
    this.getStok();
  }

  pilihVariant2(varian: string) {
    this.selectVarian2 = varian;
    this.getStok();
  }

  getStok() {
    this.model.quantity = 1;
    this.globalService.DataGet('/public/stok', {
      m_produk_id: this.model.id,
      varian1: this.selectVarian1,
      varian2: this.selectVarian2
    }).subscribe((res: any) => {
      this.model.stok = res.data.stok;
      this.model.harga = res.data.harga;
      this.selectedVarian = res.data.id;
    });
  }

  reduceTotal() {
    if (this.model.quantity > 1) {
      this.model.quantity--
    }
  }

  addTotal() {
    if (this.model.stok == 1) {
      this.model.quantity = 1;
    }
    else if (this.model.stok > 1) {
      this.model.quantity++;
    }
  }

  changeQuantity() {
    if (this.model.quantity === '0') {
      this.model.quantity = 1;
    }
  }

  addCart() {
    if (this.globalService.getAuth() === null) {
      this.router.navigate(['/login']);
    } else {
      let params = {
        user_id: this.globalService.getAuth()['user']['id'],
        product_id: this.model.id,
        promo_id: this.model.is_promo ? this.model.promo.m_promo_id : null,
        persen: this.model.is_promo ? this.model.promo.persen : 0,
        product_varian_id: this.selectedVarian,
        quantity: this.model.quantity
      }
      this.globalService.DataPost('/cart/add', params).subscribe((res: any) => {
        this.globalService.alertSuccess('Berhasil', res.message);
      })
    }
  }

  addCartFlashSale(productId: string) {
    if (this.globalService.getAuth() === null) {
      this.router.navigate(['/login']);
    } else {
      let params = {
        user_id: this.globalService.getAuth()['user']['id'],
        product_id: productId,
        quantity: 1
      }
      this.globalService.DataPost('/cart/add', params).subscribe((res: any) => {
        this.globalService.alertSuccess('Berhasil', res.message);
      })
    }
  }

  getFlashSale() {
    this.globalService.DataGet('/public/produk').subscribe((res: any) => {
      this.listProduct = res.data.list;
    })
  }

  openPreviewPhoto(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'xl' });
  }
}
