import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	model:any = {};
	address: any = {};
	session: any = [];
    totalAddress: number = 0;
	
	constructor(
		private globalService: GlobalService,
	) { }

	ngOnInit(): void {
		this.session = this.globalService.getAuth()['user']; 
		this.model.name = this.session.name;
		this.getAddress();
        this.getUser();
	}

	logout() {
		this.globalService.destroyAuth();
	}

	getAddress() {
		let params = {
			user_id: this.session.id,
			active: 1
		}
		this.globalService.DataGet('/address/main', params).subscribe((res:any) => {
			let address = res.data[0];
			this.address = address;
            this.totalAddress = res.data.length
		})
	}

    getUser() {
        this.globalService.DataGet(`/public/user`, {id: this.session.id}).subscribe((res:any) => {
            this.model = res.data;
        })
    }

}