import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NumberFormatPipe } from './number-format/number-format.pipe';
import { LimitSentencesPipe } from './limit-sentences/limit-sentences.pipe';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    SpinnerComponent,
    NumberFormatPipe,
    LimitSentencesPipe,
    MapComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    LeafletModule,
  ],
  exports: [
    SpinnerComponent,
    NumberFormatPipe,
    MapComponent,
    LimitSentencesPipe,
  ]
})
export class CoreModule { }
