import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-orders-education',
  templateUrl: './orders-education.component.html',
  styleUrls: ['./orders-education.component.scss']
})
export class OrdersEducationComponent extends MetaDataService implements OnInit {
    session: any = {};
    filter: any = {};
    listOrder: any = [];
    stars: number[] = [1, 2, 3, 4, 5];
    hoveredStar: number = -1;
    selectedStar: number = -1;
    pesan:string = "";

	constructor(
		private globalService: GlobalService,
        private modalService: NgbModal,
        titleService: Title,
        metaService: Meta
    ) { 
        super(titleService, metaService);
    }

    ngOnInit(): void {
        this.updateTags('Riwayat Pembelian Edukasi', 'account/orders-education');
        this.session = this.globalService.getAuth()['user'];
        this.empty();
        this.getOrder();
    }

    empty() {
        this.filter = {
            user_id: this.session.id,
            status: '',
            nama: ''
        }
    }

    filterStatus(status:string) {
        this.filter.status = status;
        this.getOrder();
    }

    getOrder() {
        let filter = this.filter
        this.globalService.DataGet(`/public/orders`, filter).subscribe((res:any) => {
            this.listOrder = res.data.list;
        })
    }

    openModalDetail(modal:TemplateRef<any>) {
        this.modalService.open(modal, { size: 'md', backdrop: 'static'});
    }

    openModalRating(modal:TemplateRef<any>) {
        this.modalService.open(modal, { size: 'md', backdrop: 'static'});
    }

    onMouseEnter(index: number): void {
        this.hoveredStar = index;
    }

    onMouseLeave(): void {
        this.hoveredStar = -1;
    }

    rate(index: number): void {
        this.selectedStar = index + 1;

        if (this.selectedStar == 1) {
            this.pesan = 'Sangat Mengecewakan';
        } else if (this.selectedStar == 2) {
            this.pesan = 'Kurang Memuaskan';
        } else if (this.selectedStar == 3) {
            this.pesan = 'Biasa Saja';
        } else if (this.selectedStar == 4) {
            this.pesan = 'Pengalaman yang Baik';
        } else if (this.selectedStar == 5) {
            this.pesan = 'Pengalaman yang Sangat Baik';
        }
    }

}
