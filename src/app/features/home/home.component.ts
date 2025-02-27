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
	listProduct: any = [];
	listProductPromo: any = [];
	listProductFlashsale: any = [];
	listCategory: any = [];
	statusPopup: boolean = true;
	listNews: any = [];
	listPopup: any = [];
	aktifPopup: boolean = false;
	filterProduct: string = 'featured';

	dumpNews = new Array(6)
	loading = {
		init: true,
		product: false,
	};

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
		this.getProductPromo();
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
			init: true,
			product: false,
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

	sliderClick(url: string) {
		if (url !== null || url !== '') {
			window.open(url, '_blank')
		}
	}

	changeTipeProduct(tipe: string) {
		this.filterProduct = tipe;
	}

	getProductPromo() {
		this.loading.product = true;
		this.globalService.DataGet('/public/produkPromo').subscribe((res: any) => {
		  this.listProductPromo = res.data;
		  this.loading.product = false;
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
			this.loading.init = false
		})
	}
}
