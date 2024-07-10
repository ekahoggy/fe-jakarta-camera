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
import { AddressComponent } from './account/address/address.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { GuestGuard } from '../services/guards/guest.guard';
import { NewsComponent } from './news/news.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { ServisKameraComponent } from './servis-kamera/servis-kamera.component';
import { PasangCctvComponent } from './pasang-cctv/pasang-cctv.component';
import { EducationModule } from './education/education.module';
import { PromoComponent } from './promo/promo.component';
import { JasaFotoComponent } from './jasa-foto/jasa-foto.component';
import { PaymentComponent } from './payment/payment.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessVerificationComponent } from './success-verification/success-verification.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'education',
        loadChildren: () => import('./education/education.module').then((m) => m.EducationModule),
    },
    {
        path: 'account',
        component: AccountComponent,
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [GuestGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [AuthGuard]
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
        path: 'verification',
        component: EmailVerificationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'success-verification',
        component: SuccessVerificationComponent,
        canActivate: [AuthGuard]
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
        path: 'payment',
        component: PaymentComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'subscription',
        component: SubscriptionComponent,
    },
    {
        path: 'katalog',
        component: KatalogComponent,
    },
    {
        path: 'katalog/detail/:slug',
        component: DetailProductComponent,
    },
    {
        path: 'promo',
        component: PromoComponent
    },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'news/:slug',
        component: NewsDetailComponent,
    },
    {
        path: 'flash-sale',
        component: FlashSaleComponent
    },
    {
        path: 'service',
        component: ServisKameraComponent
    },
    {
        path: 'service/jasa-foto',
        component: JasaFotoComponent
    },
    {
        path: 'service/pasang-cctv',
        component: PasangCctvComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }
