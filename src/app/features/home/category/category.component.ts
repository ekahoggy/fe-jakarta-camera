import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { SwiperOptions } from 'swiper';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
	configCategory: SwiperOptions = {};
	listCategory: any = [];
	
	loading: any = {};
	loadingInit: boolean = true
	dumpArray = new Array(6)

	constructor(
		private globalService: GlobalService,
	) {}

	ngOnInit(): void {
		this.configSwiperCategory();
		this.getCategories();
	}

	getCategories() {
		this.loading.category = true;
		this.globalService.DataGet('/public/kategori').subscribe((res: any) => {
			this.listCategory = res.data;
			this.loading.category = false;
			this.loadingInit = false
		})
	}

	onSlideChange() {
		console.log('slide change');
	}

	onSwiper(swiper: any) {
		this.loadingInit = false
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
}
