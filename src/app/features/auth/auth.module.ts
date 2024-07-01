import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { CoreModule } from 'src/app/core/core.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
    declarations: [
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        NgbDropdownModule,
        NgbModule,
        LayoutsModule,
        FormsModule,
        CountdownModule,
        CoreModule,
        NgbDatepickerModule
    ]
})
export class AuthModule { }
