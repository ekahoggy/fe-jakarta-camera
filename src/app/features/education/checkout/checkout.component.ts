import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  loadingPage: boolean = true;
  model: any = {};
  detailCheckout: any = {};
  totalEdukasi: number= 0;
  approveSNK = false;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private offcanvasService: NgbOffcanvas,
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
      this.hitungCheckout()
    })
  }

  hitungCheckout(){
    this.detailCheckout.harga = this.model.harga
    this.detailCheckout.promo = 0;
    this.detailCheckout.voucher = 0;
    this.detailCheckout.total = this.detailCheckout.harga - this.detailCheckout.promo - this.detailCheckout.voucher;
    console.log(this.detailCheckout);
  }

  openVoucher(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'bottom' });
  }
}
