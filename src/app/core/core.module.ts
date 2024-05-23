import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NumberFormatPipe } from './number-format/number-format.pipe';



@NgModule({
  declarations: [
    SpinnerComponent,
    NumberFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    NumberFormatPipe
  ]
})
export class CoreModule { }
