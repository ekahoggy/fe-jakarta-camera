import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent implements OnInit {

	constructor(
		private globalService: GlobalService,
	) { }

  ngOnInit() {}
}
