import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    model: any = [];
    detail: any = [];
    listCategory: any = [];
    urlSafe: any;
    loadingPage: boolean = true;
    play: boolean = false;
    activeTab: string = 'deskripsi';

    constructor(
        private globalService: GlobalService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public sanitizer: DomSanitizer,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const slug = params['slug'];
            this.getDataBySlug(slug);
        });
    }

    getDataBySlug(slug) {
        this.loadingPage = true;
        this.globalService.DataGet(`/public/edukasi/${slug}`).subscribe((res: any) => {
            this.model = res.data;
            this.detail = res.detail;
            this.urlSafe = this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/sVNFrxLW2pA");
        })
    }

    openModal(modal: TemplateRef<any>, is_lock) {
        if (is_lock === 1) {
            this.alertSubscribe()
        }
        else {
            this.modalService.open(modal, { size: 'xl', backdrop: 'static' });
            this.urlSafe = this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/sVNFrxLW2pA");
        }
    }


    alertSubscribe() {
        this.globalService.alertQuestion("Anda belum berlangganan", "Untuk mengakses konten edukasi ini, Anda harus berlangganan terlebih dahulu.", 3000);
    }

    openModalSubscribe(modal: TemplateRef<any>) {
        this.modalService.open(modal, { size: 'md', backdrop: 'static' });
    }
}
