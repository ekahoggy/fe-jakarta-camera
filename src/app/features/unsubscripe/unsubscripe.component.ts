import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-unsubscripe',
  templateUrl: './unsubscripe.component.html',
  styleUrls: ['./unsubscripe.component.scss']
})
export class UnsubscripeComponent {
    session: any;
    model:any = {}
    loading: boolean = false;

    constructor(
		private globalService: GlobalService,
	) {}

    ngOnInit(): void {
		this.session = this.globalService.getAuth()['user']; 
        this.empty();
    }

    empty() {
        this.model = {
            name: "",
            email: "",
            is_subscribed: 1,
        };
    }

    subscribe() {
        this.loading = true;
        const final = Object.assign(this.model)
        this.globalService.DataPost('/public/subscribe', final).subscribe((res: any) => {
            this.globalService.alertSuccess('Berlangganan', 'Terima kasih telah berlangganan! Anda sekarang akan menerima update terbaru secara langsung.', 5000);
            this.empty();
            this.loading = false;
        }, (error:any) => {
            this.globalService.alertError('Mohon Maaf', error.error.message);
            this.loading = false;
        });
    }
}
