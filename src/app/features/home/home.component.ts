import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent extends MetaDataService implements OnInit {
    private navbar: HTMLElement | null = null;
    private sticky: number = 0;
    carousel: HTMLElement | null = null;
    configSliders: SwiperOptions = {};
    configFeatured: SwiperOptions = {};
    configBrand: SwiperOptions = {};
    configFlash: SwiperOptions = {};
    configCategory: SwiperOptions = {};
    listProduct: any = [];
    listProductPromo: any = [];
    listProductFlashsale: any = [];
    listCategory: any = [];
    statusPopup: boolean = true;
    listNews: any = [];
    listPopup: any = [];
    loading = {
        slider: false,
        product: false,
        category: false,
    };
    aktifPopup: boolean = false;
    filterProduct: string = 'featured';

    constructor(
        private globalService: GlobalService,
        private router: Router,
        titleService: Title,
        metaService: Meta
    ) {
        super(titleService, metaService);
    }

    ngOnInit() {
        this.updateTags('Beranda', 'home');
        this.init();
        AOS.init();
        this.getSettingPopUp();
        this.getCategories();
        this.getProduct();
        this.getProductPromo();
        this.configSlider();
        this.configFaturedProduct();
        this.configSwiperBrand();
        this.configSwiperFlash();
        this.configSwiperCategory();
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

    configSwiperCategory() {
        this.configCategory = {
            slidesPerView: 6,
            spaceBetween: 20,
            navigation: true,
            pagination: false,
            scrollbar: { draggable: true },
            breakpoints: {
                100: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                },
                1400: {
                    slidesPerView: 6,
                    spaceBetween: 15,
                },
            },
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
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1400: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                },
            },
        }
    }

    configFaturedProduct() {
        this.configFeatured = {
            slidesPerView: 6,
            spaceBetween: 15,
            navigation: true,
            pagination: false,
            scrollbar: { draggable: true },
            breakpoints: {
                100: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                },
                1400: {
                    slidesPerView: 6,
                    spaceBetween: 15,
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
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                },
                1400: {
                    slidesPerView: 6,
                    spaceBetween: 15,
                },
            },
        }
    }



    getSettingPopUp() {
        this.globalService.DataGet('/public/setting', { kategori: 'W' }).subscribe((res: any) => {
            res.data.forEach(setting => {
                if (setting.name === 'popup') {
                    if (setting.value === 'YES') {
                        this.aktifPopup = true;
                        this.globalService.DataGet('/public/popup').subscribe((response: any) => {
                            this.listPopup = response.data;
                        });
                    }
                    else {
                        this.aktifPopup = false;
                    }
                }
            });
        })
    }

    popupClick(url: string) {
        if (url !== null || url !== '') {
            window.open(url)
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

    getProductPromo() {
        this.loading.product = true;
        this.globalService.DataGet('/public/produkPromo').subscribe((res: any) => {
            this.listProductPromo = res.data;
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

    clickProduk(item) {
        this.router.navigate([`/katalog/detail/` + item.slug]);
        this.globalService.productToLocalStorage(item);
    }

    clickViewsNews(item) {
        this.globalService.clickToViewsNews(item);
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
