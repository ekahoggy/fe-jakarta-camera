import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: ':slug',
        component: DetailsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
