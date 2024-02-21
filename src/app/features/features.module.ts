import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { KatalogComponent } from './katalog/katalog.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailProductComponent,
    KatalogComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NgbDropdownModule,
    NgbModule,
    LayoutsModule,
    SwiperModule,
    FormsModule
  ],
  exports: []
})
export class FeaturesModule { }
