import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
		brand: false,
	}

	listProduct: any = [];
	listBrand: any = [];
	listCategory: any = [];

	constructor(
		private route: ActivatedRoute,
		private globalService: GlobalService,
		private router: Router,
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const slug = params['slug'];
			this.getProduct(slug);
		});

		this.getCategories();
		this.getBrand();
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

	addCart(productId:string) {
		if (this.globalService.getAuth() === null) {
		  this.router.navigate(['/login']);
		} else {
		  let params = {
			user_id: this.globalService.getAuth()['user']['id'],
			product_id: productId,
			quantity: 1
		  }
		  this.globalService.DataPost('/cart/add', params).subscribe((res:any) => {
			this.globalService.alertSuccess('Success', res.message);
		  })
		}
	}

	getBrand() {
		this.globalService.DataGet('/public/brand').subscribe((res: any) => {
			this.listBrand = res.data.list;
		})
	}
}
