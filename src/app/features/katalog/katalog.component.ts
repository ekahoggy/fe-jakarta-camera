import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
interface CollapseStatus {
	[key: string]: boolean;
}

@Component({
	selector: 'app-katalog',
	templateUrl: './katalog.component.html',
	styleUrls: ['./katalog.component.scss']
})
export class KatalogComponent {
	isCollapsedChild: CollapseStatus = {};
	isCollapsed = {
		categories: false,
		prices: false,
		availability: false,
		brand: false,
	}

	listProduct: any = [];
	listCategory: any;
	filter: any = {};
	listBrand: any = [];

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
		this.globalService.DataGet('/public/katalog', { kategori: event ? event : ''}).subscribe((res: any) => {
			this.listProduct = res.data.list;
		})
	}

	getProductByBrand(event: string = '') {
		this.globalService.DataGet('/public/katalog', { brand: event ? event : ''}).subscribe((res: any) => {
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

	getBrand() {
		this.globalService.DataGet('/public/brand').subscribe((res: any) => {
			this.listBrand = res.data.list;
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
}
