import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit{
    email: string = "";

    constructor(
        private route: ActivatedRoute,
      ) { }
      
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const data = JSON.parse(atob(params['data']));
            this.email = data.email;
        });
    }
}
