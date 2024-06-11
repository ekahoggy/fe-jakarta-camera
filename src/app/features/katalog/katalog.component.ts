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
	listCategory: any = [];
	listBrand: any = [];
	filter: any = {};
	filterCategory: any = [];
    selectKategori: any;
    filterBrand: any = [];
    selectBrand: any;

	constructor(
		private route: ActivatedRoute,
		private globalService: GlobalService,
		private router: Router,
	) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			const slug = params === undefined ? {} : params;
            this.getProduct(slug);
            
            if (params !== undefined) {
                this.selectKategori = params['category']
                this.selectBrand = params['brand']
            }
		});

		this.getCategories();
		this.getBrand();
	}

	getProduct(event:any) {
        const params = {
            filter: JSON.stringify(event)
        };
		this.globalService.DataGet('/public/katalog', params).subscribe((res: any) => {
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
                // Collapse
				this.isCollapsedChild[val.slug] = true;

                // Check
                val.selected = false;
                if (Array.isArray(this.selectKategori)) {
                    this.selectKategori.forEach(e => {
                        if (val.slug == e) {
                            val.selected = true;
                        }
                    });
                } else {
                    if (val.slug == this.selectKategori) {
                        val.selected = true;
                        this.addFilterKategori(val.slug);
                    }
                }
			})
		})
	}

	getBrand() {
		this.globalService.DataGet('/public/brand').subscribe((res: any) => {
			this.listBrand = res.data.list;

            this.listBrand.forEach((val: any) => {
                // Check
                val.selected = false;
                if (Array.isArray(this.selectBrand)) {
                    this.selectBrand.forEach(e => {
                        if (val.slug == e) {
                            val.selected = true;
                        }
                    });
                } else {
                    if (val.slug == this.selectBrand) {
                        val.selected = true;
                        this.addFilterBrand(val.slug);
                    }
                }
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
                this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
                    this.router.navigate([this.router.url]);
                });
            })
		}
	}

    addFilterKategori(e:any) {
        if (typeof e !== 'string' && e !== undefined) {
            if (e.target.checked) {
                this.filterCategory.push(e.target.value);
            } else {
                this.removeItemOnArray(this.filterCategory, e.target.value);
            }
        } else if (typeof e === 'string') {
            if (!this.filterCategory.some(([x]: [string, any]) => x === e)) {
                this.filterCategory.push(e);
            }
        }

        this.navigateKatalog();
    }

    addFilterBrand(e:any) {
        if (typeof e !== 'string' && e !== undefined) {
            if (e.target.checked) {
                this.filterBrand.push(e.target.value);
            } else {
                this.removeItemOnArray(this.filterBrand, e.target.value);
            }
        } else if (typeof e === 'string') {
            if (!this.filterBrand.some(([x]: [string, any]) => x === e)) {
                this.filterBrand.push(e);
            }
        }

        this.navigateKatalog();
    }

    removeItemOnArray(arr: [], element: string) {
        arr.forEach((value, index) => {
            if (value == element) arr.splice(index, 1);
        });
    }

    navigateKatalog() {
        let params = { category: this.filterCategory, brand: this.filterBrand };
        this.router.navigate(['/katalog'], { queryParams: params });
        this.getProduct(params);
    }
}
