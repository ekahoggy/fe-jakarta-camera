import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import * as AOS from 'aos';

interface CollapseStatus {
  [key: string]: boolean;
}

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  isCollapsedChild: CollapseStatus = {};
  isCollapsed = {
    categories: false,
    prices: false,
    brand: false,
  }

  listProduct: any = [];
  listBrand: any = [];
  listCategory: any = [];
  configFlash: any = {};
  listFlashSale: any;
  filterCategory: any = [];
  selectKategori: any;
  filterBrand: any = [];
  selectBrand: any;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const slug = params === undefined ? {} : params;
      this.getProduct(slug);

      if (params !== undefined) {
        this.selectKategori = params['category']
        this.selectBrand = params['brand']
      }
    });
    this.getFlashSale();
    this.getCategories();
    this.getBrand();
    this.configSwiperFlash();
  }

  getProduct(event: any) {
    const params = {
      filter: JSON.stringify(event)
    };
    this.globalService.DataGet('/public/produkPromo', params).subscribe((res: any) => {
      this.listProduct = res.data;
    })
  }

  getFlashSale(event: string = '') {
    this.globalService.DataGet('/public/flashsale', { kategori: event ? event : '' }).subscribe((res: any) => {
      this.listFlashSale = res.data;
    })
  }

  getProductByBrand(event: string = '') {
    this.globalService.DataGet('/public/katalog', { brand: event ? event : '' }).subscribe((res: any) => {
      this.listProduct = res.data.list;
    })
  }

  getCategories() {
    this.globalService.DataGet('/public/kategori').subscribe((res: any) => {
      this.listCategory = res.data;

      this.listCategory.forEach((val: any) => {
        // Collapse
        this.isCollapsedChild[val.slug] = true;

        // Check
        val.selected = false;
        if (Array.isArray(this.selectKategori)) {
          this.selectKategori.forEach(e => {
            if (val.slug == e) {
              val.selected = true;
            }
          });
        } else {
          if (val.slug == this.selectKategori) {
            val.selected = true;
            this.addFilterKategori(val.slug);
          }
        }
      })
    })
  }

  addCart(productId: string) {
    if (this.globalService.getAuth() === null) {
      this.router.navigate(['/login']);
    } else {
      let params = {
        user_id: this.globalService.getAuth()['user']['id'],
        product_id: productId,
        quantity: 1
      }
      this.globalService.DataPost('/cart/add', params).subscribe((res: any) => {
        this.globalService.alertSuccess('Success', res.message);
      })
    }
  }

  getBrand() {
    this.globalService.DataGet('/public/brand').subscribe((res: any) => {
      this.listBrand = res.data.list;

      this.listBrand.forEach((val: any) => {
        // Check
        val.selected = false;
        if (Array.isArray(this.selectBrand)) {
          this.selectBrand.forEach(e => {
            if (val.slug == e) {
              val.selected = true;
            }
          });
        } else {
          if (val.slug == this.selectBrand) {
            val.selected = true;
            this.addFilterBrand(val.slug);
          }
        }
      })
    })
  }

  addFilterKategori(e: any) {
    if (typeof e !== 'string' && e !== undefined) {
      if (e.target.checked) {
        this.filterCategory.push(e.target.value);
      } else {
        this.removeItemOnArray(this.filterCategory, e.target.value);
      }
    } else if (typeof e === 'string') {
      if (!this.filterCategory.some(([x]: [string, any]) => x === e)) {
        this.filterCategory.push(e);
      }
    }

    this.navigateKatalog();
  }

  addFilterBrand(e: any) {
    if (typeof e !== 'string' && e !== undefined) {
      if (e.target.checked) {
        this.filterBrand.push(e.target.value);
      } else {
        this.removeItemOnArray(this.filterBrand, e.target.value);
      }
    } else if (typeof e === 'string') {
      if (!this.filterBrand.some(([x]: [string, any]) => x === e)) {
        this.filterBrand.push(e);
      }
    }

    this.navigateKatalog();
  }

  removeItemOnArray(arr: [], element: string) {
    arr.forEach((value, index) => {
      if (value == element) arr.splice(index, 1);
    });
  }

  navigateKatalog() {
    let params = { category: this.filterCategory, brand: this.filterBrand };
    this.router.navigate(['/katalog'], { queryParams: params });
    this.getProduct(params);
  }

  onSwiper(swiper: any) {
    // console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  configSwiperFlash() {
    this.configFlash = {
      slidesPerView: 5,
      spaceBetween: 15,
      navigation: true,
      pagination: false,
      scrollbar: { draggable: true },
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        770: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
    }
  }
}
