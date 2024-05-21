import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
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
    EducationRoutingModule
  ]
})
export class EducationModule { }
