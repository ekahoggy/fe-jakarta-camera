import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    listNews: any = [];
    listCategory: any = [];
    filter: any = {};

    constructor(private globalService: GlobalService) {}

    ngOnInit(): void {
        this.getNews();
        this.getCategory();
        this.empty();
    }

    empty() {
        this.filter.judul = "";
        this.filter.kategori = "";
    }

    filterCategory(kategori:string) {
        this.filter.kategori = kategori;
        this.getNews();
    }

    getNews() {
        const params = {
            filter: JSON.stringify(this.filter)
        };
        this.globalService.DataGet('/public/news', params).subscribe((res: any) => {
            this.listNews = res.data.list;
        })
    }

    getCategory() {
        this.globalService.DataGet('/public/category-news').subscribe((res: any) => {
            this.listCategory = res.data.list;
        })
    }
}
