import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent extends MetaDataService implements OnInit {
    listNews: any = [];
    listNewsTerbaru: any = [];
    tags: any = [];
    listCategory: any = [];
    filter: any = {};

    constructor(
        private globalService: GlobalService,
        titleService: Title,
        metaService: Meta
    ) { 
        super(titleService, metaService);
    }

    ngOnInit(): void {
        this.updateTags('Berita', 'news');
        this.getNews();
        this.getNewsTerbaru();
        this.getCategory();
        this.empty();
    }

    empty() {
        this.filter.judul = "";
        this.filter.kategori = "";
    }

    filterCategory(kategori: string) {
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

    getNewsTerbaru() {
        this.globalService.DataGet('/public/news/getNewsTerbaru').subscribe((res: any) => {
            this.listNewsTerbaru = res.data.article;
            this.tags = res.data.tags;
        })
    }

    clickViewsNews(item) {
        this.globalService.clickToViewsNews(item);
    }

    getCategory() {
        this.globalService.DataGet('/public/category-news').subscribe((res: any) => {
            this.listCategory = res.data.list;
        })
    }
}
