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
        slider: false,
        kategori: false,
        edukasi: false,
    };
    listSlider: any;
    listKategori: any;
    listEdukasi: any;
    filter: any = {};

    constructor(
        private globalService: GlobalService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.empty()
        this.getSlider()
        this.getKategori()
        this.getEdukasi()
    }

    empty() {
        this.filter.kategori = ""
    }

    getSlider() {
        this.loading.slider = true;
        this.globalService.DataGet('/public/edukasi/slider').subscribe((res: any) => {
            this.listSlider = res.data;
            this.loading.slider = false;
        })
    }

    getKategori() {
        this.loading.kategori = true;
        this.globalService.DataGet('/public/edukasi/kategori').subscribe((res: any) => {
            this.listKategori = res.data;
            this.loading.kategori = false;
        })
    }

    getEdukasi() {
        this.loading.edukasi = true;
        const params = {
            filter: JSON.stringify(this.filter)
        };
        this.globalService.DataGet('/public/edukasi/list', params).subscribe((res: any) => {
            this.listEdukasi = res.data.list;
            this.loading.edukasi = false;
        })
    }

    sliderClick(url: string) {
        if (url !== null || url !== '') {
            window.open(url, '_blank')
        }
    }
}
