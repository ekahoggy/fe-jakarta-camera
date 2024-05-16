import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
	listCart: any;
	loading: boolean = false;
	subtotal: number = 0;
	total: number = 0;
	model: any = {};
	userId: string = "";
	session: any = {};

	constructor(
		private globalService: GlobalService,
		private router: Router,
	) { }

	ngOnInit() {
		this.session = this.globalService.getAuth()['user'];
		this.userId = this.session.id
		this.getData();
		this.getUserDetail();
	}

	getData() {
		this.globalService.DataGet('/cart/get', {user_id: this.userId}).subscribe((res:any ) => {
			this.listCart = res.data;
			this.kalkulasi();
		});
	}

	getUserDetail() {
		let params = {
			user_id: this.userId,
			active: 1
		}
		this.globalService.DataGet('/address/main', params).subscribe((res:any ) => {
			let address = res.data[0];
			this.model = address;
			this.model.email = this.session.email; 
		});
	}

	kalkulasi() {
		this.subtotal = 0;
		this.total = 0;
		this.listCart.forEach((val:any) => {
			val.price = val.harga
			val.subtotal_price = (val.harga * val.quantity) 
			val.grandtotal_price = (val.harga * val.quantity)

			this.subtotal += (val.harga * val.quantity)
			this.total = this.subtotal
		})
	}

	checkout() {
		let data = Object.assign(this.model);
		data.user_id = this.userId
		data.total = this.subtotal
		data.grand_total = this.total

		let params = {
			data: data,
			detail: this.listCart
		}
		this.loading = true;
		this.globalService.DataPost('/order/pay', params).subscribe((res:any) => {
			this.loading = false;
			this.globalService.alertSuccess("Success", "Success create order")
			this.router.navigate(['/complete-order']);
		})
	}
}
