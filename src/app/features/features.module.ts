import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { KatalogComponent } from './katalog/katalog.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailProductComponent,
    KatalogComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NgbDropdownModule,
    NgbModule,
    LayoutsModule,
    SwiperModule,
  ],
  exports: []
})
export class FeaturesModule { }
