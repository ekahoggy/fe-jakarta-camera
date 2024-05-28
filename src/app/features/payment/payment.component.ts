import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  urlSafe: any;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const url = JSON.parse(atob(params['data']));
      this.urlSafe = this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url.url);
    });
  }

  onSuccess() {
			this.router.navigate(['/complete-order']);
  }

}
