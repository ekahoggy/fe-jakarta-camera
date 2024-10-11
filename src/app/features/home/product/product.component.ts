import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
	listProduct: any = [];
	currentPage = 1;
	perPage = 12;
	lastPage = false;
	loading: any = {}

	constructor(
		private globalService: GlobalService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.getProduct();
	}

	getProduct() {
		let params = {
			'page': this.currentPage,
			'per_page': this.perPage
		};
		this.loading.product = true;
		this.globalService.DataGet('/public/produk', params).subscribe((res: any) => {
			this.listProduct = [...this.listProduct, ...res.data.list.data];
			this.lastPage = !res.data.list.next_page_url;
			this.loading.product = false;
		})
	}

	loadMore() {
		if (!this.lastPage) {
			this.currentPage++;
			this.getProduct();
		}
	}

	clickProduk(item) {
		this.router.navigate([`/katalog/detail/` + item.slug]);
		this.globalService.productToLocalStorage(item);
	}
}
