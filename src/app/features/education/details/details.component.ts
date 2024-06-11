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
    listCategory: any = [];
    urlSafe: any;
    
    constructor(
        private globalService: GlobalService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public sanitizer: DomSanitizer,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const slug = params['slug'];
        });
    }

    openModal(modal:TemplateRef<any>) {
        this.modalService.open(modal, { size: 'xl', backdrop: 'static'});
        this.urlSafe = this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/sVNFrxLW2pA");
    }

    alertSubscribe() {
        this.globalService.alertQuestion("Anda belum berlangganan", "Untuk mengakses konten edukasi ini, Anda harus berlangganan terlebih dahulu.", 3000);
    }
}
