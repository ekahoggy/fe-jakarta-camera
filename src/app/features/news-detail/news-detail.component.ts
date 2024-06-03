import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {
    model: any = [];
    listCategory: any = [];

    constructor(
        private globalService: GlobalService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const slug = params['slug'];
            this.getNews(slug);
        });
        this.getCategory();
    }

    getNews(slug:string) {
        this.globalService.DataGet(`/public/news/${slug}`).subscribe((res: any) => {
            this.model = res.data.article;
        })
    }

    getCategory() {
        this.globalService.DataGet('/public/category-news').subscribe((res: any) => {
            this.listCategory = res.data.list;
        })
    }
}
