import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.development';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productImageURL: string = environment.productImageURL;
  originalImageUrl: string = environment.originalImageURL;
  private navbar: HTMLElement | null = null;
  private sticky: number = 0;
  carousel: HTMLElement | null = null;
  configFeatured: SwiperOptions = {};
  configBrand: SwiperOptions = {};
  listSlider: any = [];
  listProduct: any = [];
  listCategory: any = [];

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.getSlider();
    this.getCategories();
    this.getProduct();
    this.configFaturedProduct();
    this.configSwiperBrand();
    this.navbar = document.getElementById("navbar");
    this.carousel = document.getElementById("banner-carousel");
    if (this.navbar) {
      this.sticky = this.navbar.offsetTop - 20;
    }
    console.log(window.location.hostname == 'localhost')
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.myFunction();
  }

  private myFunction() {
    if (this.carousel && window.scrollY >= this.sticky) {
      this.carousel.classList.add("content-up");
    } else if (this.carousel) {
      this.carousel.classList.remove("content-up");
    }
  }

  onSwiper(swiper:any) {
    // console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  configFaturedProduct() {
    this.configFeatured = {
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
          slidesPerView: 3,
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
  configSwiperBrand() {
    this.configBrand = {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: false,
      pagination: false,
      scrollbar: { draggable: true },
      breakpoints: {
        100: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      },
    }
  }

  getSlider() {
    this.globalService.DataGet('/public/slider').subscribe((res:any) => {
      this.listSlider = res.data;
    })
  }

  getProduct() {
    this.globalService.DataGet('/public/produk').subscribe((res:any) => {
      this.listProduct = res.data;
    })
  }

  getCategories() {
    this.globalService.DataGet('/public/kategori').subscribe((res:any) => {
      this.listCategory = res.data;
    })
  }
}
