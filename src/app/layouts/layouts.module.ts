import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutsComponent } from './layouts.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FootMenuComponent } from './foot-menu/foot-menu.component';

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
    NgbModule
  ],
  exports: [
    FooterComponent,
    FootMenuComponent,
  ]
})
export class LayoutsModule { }
