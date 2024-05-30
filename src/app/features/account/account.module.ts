import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AddressComponent,
    OrdersComponent
  ], 
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbDropdownModule,
    NgbModule,
    LayoutsModule,
    FormsModule,
    CountdownModule,
    CoreModule
  ]
})
export class AccountModule { }
