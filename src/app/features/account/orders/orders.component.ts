import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    session: any = {};
    filter: any = {};
    listOrder: any = [];

	constructor(
		private globalService: GlobalService,
	) {}
    
    ngOnInit(): void {
        this.session = this.globalService.getAuth()['user']; 
        this.empty();
        this.getOrder();
    }

    empty() {
        this.filter = {
            user_id: this.session.id,
            status: '',
            nama: ''
        }
    }

    filterStatus(status:string) {
        this.filter.status = status;
        this.getOrder();
    }

    getOrder() {
        let filter = this.filter
        this.globalService.DataGet(`/public/orders`, filter).subscribe((res:any) => {
            this.listOrder = res.data.list;
        })
    }
}
