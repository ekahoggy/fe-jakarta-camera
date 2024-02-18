import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  desc: string = 'description';
  configRekomendasi:any = {};

  ngOnInit() {
    this.configRekomendasiProduct();
  }

  switchDesc(params:string) {
    this.desc = params;
  }

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

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
}
