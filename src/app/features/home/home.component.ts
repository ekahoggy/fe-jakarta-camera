import * as AOS from 'aos';
import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment.development';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
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
    configSliders: SwiperOptions = {};
    configFeatured: SwiperOptions = {};
    configBrand: SwiperOptions = {};
    configFlash: SwiperOptions = {};
    listSlider: any = [];
    listProduct: any = [];
    listCategory: any = [];
    statusPopup: boolean = true;
    listNews: any = [];
    loading = {
        slider: false,
        product: false,
        category: false,
    };
    filterProduct: string = 'featured';

    constructor(
        private globalService: GlobalService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.init();
        AOS.init();
        this.getSlider();
        this.getCategories();
        this.getProduct();
        this.configSlider();
        this.configFaturedProduct();
        this.configSwiperBrand();
        this.configSwiperFlash();
        this.getNews();
        this.carousel = document.getElementById("banner-carousel");
        if (this.navbar) {
            this.sticky = this.navbar.offsetTop - 20;
        }
    }

    @HostListener('window:scroll', [])
    onScroll() {
        this.myFunction();
    }

    init() {
        this.loading = {
            slider: false,
            product: false,
            category: false,
        };
    }

    private myFunction() {
        if (this.carousel && window.scrollY >= this.sticky) {
            this.carousel.classList.add("content-up");
        } else if (this.carousel) {
            this.carousel.classList.remove("content-up");
        }
    }

    onSwiper(swiper: any) {
        // console.log(swiper);
    }

    onSlideChange() {
        console.log('slide change');
    }

    configSlider() {
        this.configSliders = {
            navigation: true,
        }
    }

    configSwiperFlash() {
        this.configFlash = {
            slidesPerView: 5,
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
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },
        }
    }

    configFaturedProduct() {
        this.configFeatured = {
            slidesPerView: 6,
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
        this.loading.slider = true;
        this.globalService.DataGet('/public/slider').subscribe((res: any) => {
            this.listSlider = res.data.list;
            this.loading.slider = false;
        })
    }

    sliderClick(url: string) {
        if (url !== null || url !== '') {
            window.open(url, '_blank')
        }
    }

    changeTipeProduct(tipe: string) {
        this.filterProduct = tipe;
    }

    getProduct() {
        this.loading.product = true;
        this.globalService.DataGet('/public/produk').subscribe((res: any) => {
            this.listProduct = res.data.list;
            this.loading.product = false;
        })
    }

    getCategories() {
        this.loading.category = true;
        this.globalService.DataGet('/public/kategori').subscribe((res: any) => {
            this.listCategory = res.data;
            this.loading.category = false;
        })
    }

    closePopup() {
        this.statusPopup = false;
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

    getNews() {
        this.globalService.DataGet('/public/news').subscribe((res: any) => {
            this.listNews = res.data.list;
        })
    }
}
