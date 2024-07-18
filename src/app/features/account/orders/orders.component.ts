import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends MetaDataService implements OnInit {
    session: any = {};
    filter: any = {};
    listOrder: any = [];
    stars: number[] = [1, 2, 3, 4, 5];
    hoveredStar: number = -1;
    selectedStar: number = -1;
    pesan:string = "";
    dataUlasan: any = {}
    loading: boolean = false;
    dataDetail: any = {};
    tampilResi: boolean = false;

	constructor(
		private globalService: GlobalService,
        private modalService: NgbModal,
        titleService: Title,
        metaService: Meta
    ) { 
        super(titleService, metaService);
    }

    ngOnInit(): void {
        this.updateTags('Riwayat Pembelian', 'account/orders');
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
        this.dataUlasan = {};
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

    openModalDetail(modal:TemplateRef<any>, data) {
        this.modalService.open(modal, { size: 'md', backdrop: 'static'});
        this.dataDetail = data;
    }

    openModalRating(modal:TemplateRef<any>, id, detail) {
        this.modalService.open(modal, { size: 'md', backdrop: 'static'});
        this.dataUlasan.ulasan_id = detail.ulasan_id ? detail.ulasan_id : 0;
        this.dataUlasan.m_produk_id = detail.product_id;
        this.dataUlasan.user_id = this.session.id;
        this.dataUlasan.t_order_id = id;
        this.dataUlasan.nama = detail.nama;
        this.dataUlasan.photo = detail.photo;
        this.dataUlasan.rating = detail.rating ? detail.rating : 5;
        this.dataUlasan.ulasan = detail.ulasan ? detail.ulasan : "";
    }

    postUlasan() {
        this.loading = true;
        const final = Object.assign(this.dataUlasan)
        this.globalService.DataPost('/public/post-ulasan', final).subscribe((res: any) => {
            this.globalService.alertSuccess('Berhasil', 'Ulasan berhasil di kirim');
            this.empty();
            this.getOrder();
            this.modalService.dismissAll();
            this.loading = false;
        }, (error:any) => {
            this.globalService.alertError('Mohon Maaf', error.error.message);
            this.loading = false;
        });
    }

    onMouseEnter(index: number): void {
        this.hoveredStar = index;
    }

    onMouseLeave(): void {
        this.hoveredStar = -1;
    }

    rate(index: number): void {
        this.dataUlasan.rating = index + 1;

        if (this.dataUlasan.rating == 1) {
            this.pesan = 'Sangat Mengecewakan';
        } else if (this.dataUlasan.rating == 2) {
            this.pesan = 'Kurang Memuaskan';
        } else if (this.dataUlasan.rating == 3) {
            this.pesan = 'Biasa Saja';
        } else if (this.dataUlasan.rating == 4) {
            this.pesan = 'Pengalaman yang Baik';
        } else if (this.dataUlasan.rating == 5) {
            this.pesan = 'Pengalaman yang Sangat Baik';
        }
    }

}
