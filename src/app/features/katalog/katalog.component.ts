import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.scss']
})
export class KatalogComponent {
  isCollapsed = {
    categories: false,
    prices: false,
    availability: false,
  }

}
