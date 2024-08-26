import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
	loading: boolean = false;
	listSlider: any = [];

	constructor(
        private globalService: GlobalService,
    ) {}

	ngOnInit(): void {
		this.getSlider();
	}

	getSlider() {
		this.loading = true;
		this.globalService.DataGet('/public/slider').subscribe((res: any) => {
			this.listSlider = res.data.list;
			this.loading = false;
		})
	}

	sliderClick(url: string) {
        if (url !== null || url !== '') {
            window.open(url, '_blank')
        }
    }
}
