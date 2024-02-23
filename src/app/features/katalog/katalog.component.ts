import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';
interface CollapseStatus {
  [key: string]: boolean;
}

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.scss']
})
export class KatalogComponent {
  isCollapsedChild: CollapseStatus = {};
  isCollapsed = {
    categories: false,
    prices: false,
    availability: false,
  }

  listProduct:any = [];
  listCategory: any;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.getProduct(slug);
    });


    this.getCategories();
  }

  getProduct(event:string = '') {
    this.globalService.DataGet('/public/katalog', { kategori: event ? event : '' }).subscribe((res:any) => {
      this.listProduct = res.data;
    })
  }

  getCategories() {
    this.globalService.DataGet('/public/kategori').subscribe((res:any) => {
      this.listCategory = res.data;

      this.listCategory.forEach((val:any) => {
        this.isCollapsedChild[val.slug] = true;
      })
    })
  }


}
