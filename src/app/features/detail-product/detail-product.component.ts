import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  desc: string = 'description';
  configRekomendasi:any = {};
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.getProduct(slug);
    });
    this.configRekomendasiProduct();
  }

  switchDesc(params:string) {
    this.desc = params;
  }

  onSwiper(swiper:any) {}
  onSlideChange() {}

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

  getProduct(slug:string) {
    this.globalService.DataGet('/public/getProdukSlug', {slug: slug}).subscribe((res:any) => {
      this.model = res.data;
    })
  }
}
