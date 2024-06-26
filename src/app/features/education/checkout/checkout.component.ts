import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
  ) { }

  ngOnInit(): void {

  }

  openVoucher(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'bottom' });
  }
}
