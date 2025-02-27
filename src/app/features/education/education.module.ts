import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { CoreModule } from 'src/app/core/core.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EducationRoutingModule } from './education-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    CheckoutComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    NgbDropdownModule,
    NgbModule,
    LayoutsModule,
    SwiperModule,
    FormsModule,
    CountdownModule,
    CoreModule
  ]
})
export class EducationModule { }
