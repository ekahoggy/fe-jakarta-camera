import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
	listProduct: any = [];

    constructor(
		private globalService: GlobalService,
		private router: Router,
	) { }

    ngOnInit(): void {
        this.getProduct();
    }

    getProduct() {
		this.globalService.DataGet('/public/katalog', {}).subscribe((res: any) => {
			this.listProduct = res.data.list;
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
}
