import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { KatalogComponent } from './katalog/katalog.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AddressComponent } from './address/address.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { GuestGuard } from '../services/guards/guest.guard';
import { NewsComponent } from './news/news.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { ServisKameraComponent } from './servis-kamera/servis-kamera.component';
import { PasangCctvComponent } from './pasang-cctv/pasang-cctv.component';
import { EducationModule } from './education/education.module';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:slug',
    component: DetailProductComponent,
  },
  {
    path: 'katalog/:slug',
    component: KatalogComponent,
  },
  {
    path: 'katalog',
    component: KatalogComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'complete-order',
    component: CompleteOrderComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'flash-sale',
    component: FlashSaleComponent
  },
  {
    path: 'service/camera',
    component: ServisKameraComponent
  },
  {
    path: 'service/pasang-cctv',
    component: PasangCctvComponent
  },
  {
    path: 'education',
    loadChildren: () => import('./education/education.module').then((m) => m.EducationModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
