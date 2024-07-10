import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersEducationComponent } from './orders-education/orders-education.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'address',
        component: AddressComponent,
    },
    {
        path: 'orders',
        component: OrdersComponent,
    },
    {
        path: 'orders-education',
        component: OrdersEducationComponent,
    },
    {
        path: 'wishlist',
        component: WishlistComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
