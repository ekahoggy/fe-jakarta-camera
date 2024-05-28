import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { KatalogComponent } from './katalog/katalog.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AddressComponent } from './address/address.component';
import { NewsComponent } from './news/news.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { ServisKameraComponent } from './servis-kamera/servis-kamera.component';
import { PasangCctvComponent } from './pasang-cctv/pasang-cctv.component';
import { CoreModule } from '../core/core.module';
import { PromoComponent } from './promo/promo.component';
import { JasaFotoComponent } from './jasa-foto/jasa-foto.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailProductComponent,
    KatalogComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AddressComponent,
    NewsComponent,
    CompleteOrderComponent,
    FlashSaleComponent,
    ServisKameraComponent,
    PasangCctvComponent,
    PromoComponent,
    JasaFotoComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    NgbDropdownModule,
    NgbModule,
    LayoutsModule,
    SwiperModule,
    FormsModule,
    CountdownModule,
    CoreModule
  ],
  exports: []
})
export class FeaturesModule { }
