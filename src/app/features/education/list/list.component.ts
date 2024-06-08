import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    loading = {
        slider: false
    };
    listSlider: any;

    constructor(
        private globalService: GlobalService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getSlider()
    }

    getSlider() {
        this.loading.slider = true;
        this.globalService.DataGet('/public/slider').subscribe((res: any) => {
            this.listSlider = res.data.list;
            this.loading.slider = false;
        })
    }

    sliderClick(url: string) {
        if (url !== null || url !== '') {
            window.open(url, '_blank')
        }
    }
}
