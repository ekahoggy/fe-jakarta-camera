import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string, locale: string = 'en-US'): string {
    // Convert the value to a number
    const numberValue = Number(value);
  
    // Check if the conversion was successful
    if (isNaN(numberValue)) {
      throw new Error('Value provided is not a valid number.');
    }
  
    // Format the number according to the specified locale
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  
    // Replace any comma with a dot
    return formattedNumber.replace(/,/g, '.');
  }

}
