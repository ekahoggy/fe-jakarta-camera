import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CountdownModule } from 'ngx-countdown';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MapComponent } from 'src/app/core/map/map.component';
import { OrdersEducationComponent } from './orders-education/orders-education.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AddressComponent,
    OrdersComponent,
    WishlistComponent,
    OrdersEducationComponent
  ], 
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbDropdownModule,
    NgbModule,
    LayoutsModule,
    FormsModule,
    CountdownModule,
    CoreModule,
    NgbDatepickerModule
  ]
})
export class AccountModule { }
