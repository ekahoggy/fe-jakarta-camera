import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
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
		availability: false,
	}

	listProduct: any = [];
	listCategory: any;

	constructor(
		private route: ActivatedRoute,
		private globalService: GlobalService,
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const slug = params['slug'];
			this.getProduct(slug);
		});


		this.getCategories();
	}

	getProduct(event: string = '') {
		this.globalService.DataGet('/public/katalog', { kategori: event ? event : '' }).subscribe((res: any) => {
			this.listProduct = res.data.list;
		})
	}

	getCategories() {
		this.globalService.DataGet('/public/kategori').subscribe((res: any) => {
			this.listCategory = res.data;

			this.listCategory.forEach((val: any) => {
				this.isCollapsedChild[val.slug] = true;
			})
		})
	}
}
