import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutsComponent } from './layouts.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FootMenuComponent } from './foot-menu/foot-menu.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../features/login/login.component';
import { FeaturesModule } from '../features/features.module';

@NgModule({
  declarations: [
    LayoutsComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    FootMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    FootMenuComponent,
  ]
})
export class LayoutsModule { }
