import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NumberFormatPipe } from './number-format/number-format.pipe';
import { LimitSentencesPipe } from './limit-sentences/limit-sentences.pipe';



@NgModule({
  declarations: [
    SpinnerComponent,
    NumberFormatPipe,
    LimitSentencesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    NumberFormatPipe,
    LimitSentencesPipe
  ]
})
export class CoreModule { }
