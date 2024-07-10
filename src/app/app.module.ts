import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { AuthGuard } from './services/guards/auth.guard';
import { CountdownModule } from 'ngx-countdown';
import { RecaptchaModule } from 'ng-recaptcha';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CountdownModule,
    SweetAlert2Module.forRoot(),
    RecaptchaModule,
    LeafletModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleIdClient),
          },
        ],
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
