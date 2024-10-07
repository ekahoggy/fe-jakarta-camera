import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { RouterModule } from '@angular/router';

import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home.component';
import { ProductComponent } from './product/product.component';



@NgModule({
	declarations: [
		SliderComponent,
		CategoryComponent,
		HomeComponent,
  ProductComponent
	],
	imports: [
		CommonModule,
		NgbDropdownModule,
		NgbModule,
		LayoutsModule,
		SwiperModule,
		FormsModule,
		CountdownModule,
		CoreModule,
		RecaptchaModule,
		RouterModule
	],
	exports: [
		SliderComponent
	]
})
export class HomeModule { }
