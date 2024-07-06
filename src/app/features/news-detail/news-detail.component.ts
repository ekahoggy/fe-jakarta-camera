import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Meta, Title } from '@angular/platform-browser';
import { MetaDataService } from 'src/app/services/meta-data.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent extends MetaDataService implements OnInit {
    model: any = [];
    webUrl = environment.url;
    listCategory: any = [];
    listNewsTerbaru: any = [];
    tags: any = [];
    listComment: any = [];
    auth: any;

    constructor(
        private globalService: GlobalService,
        private route: ActivatedRoute,
        titleService: Title,
        metaService: Meta
    ) {
        super(titleService, metaService);
    }

    ngOnInit(): void {
        this.auth = this.globalService.getAuth()["user"];
        this.route.params.subscribe((params:any) => {
            const slug = params['slug'];
            this.getNews(slug);
        });
        this.getCategory();
        this.getNewsTerbaru()
    }

    getNews(slug: string) {
        this.globalService.DataGet(`/public/news/${slug}`).subscribe((res: any) => {
            this.model = res.data.article;
            this.updateTags(this.model.judul, 'news/' + this.model.slug, this.model.meta_content, this.model.image);
            this.getComment(this.model.id);
        })
    }

    getCategory() {
        this.globalService.DataGet('/public/category-news').subscribe((res: any) => {
            this.listCategory = res.data.list;
        })
    }

    resolved(captchaResponse) {
        this.model.captcha = captchaResponse;
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    copy() {
        // copy url to clipboard
        window.navigator.clipboard.writeText(window.location.href);
        // show alert
        Swal.fire({
            text: 'Link News berhasil disalin',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2000
        })
    }

    clickShareButton(link = 'salin') {
        let contentShare = this.model.meta_content;

        switch (link) {
            case 'wa':
                window.open("https://wa.me/?text=" + encodeURIComponent(contentShare + " " + "\r\n" + this.webUrl + 'news/' + this.model.slug));
                break;
            case 'telegram':
                window.open("https://t.me/share/url?url=" + encodeURIComponent(this.webUrl + 'news/' + this.model.slug) + "&text=" + encodeURIComponent(contentShare));
                break;
            case 'facebook':
                window.open("https://www.facebook.com/sharer.php?u=" + encodeURIComponent(this.webUrl + 'news/' + this.model.slug));
                break;
            case 'twitter':
                window.open("https://twitter.com/share?url=" + encodeURIComponent(this.webUrl + 'news/' + this.model.slug) + "&text=" + encodeURIComponent(contentShare));
                break;
            case 'email':
                let mailtoLink = "mailto:?subject=" + encodeURIComponent(this.model.judul) + "&body=" + encodeURIComponent(this.model.content);
                window.location.href = mailtoLink;
                break;
            default:
                this.copy();
                break;
        }
    }

    getComment(id) {
        this.globalService.DataGet(`/public/news/comment/${id}`).subscribe((res: any) => {
            this.listComment = res.data.list;
        })
    }

    postComment() {
        const params = {
            user_id: this.auth.id,
            news_id: this.model.id,
            nama: this.model.nama,
            email: this.model.email,
            komentar: this.model.komentar
        }
        const final = Object.assign(params)
        this.globalService.DataPost('/public/news/post', final).subscribe((res: any) => {
            this.globalService.alertSuccess('Berhasil', 'Komentar berhasil di unggah');
        }, (error:any) => {
            this.globalService.alertError('Mohon Maaf', error.error.message);
        });
    }

    getNewsTerbaru() {
      this.globalService.DataGet('/public/news/getNewsTerbaru').subscribe((res: any) => {
          this.listNewsTerbaru = res.data.article;
          this.tags = res.data.tags;
      })
  }
}
