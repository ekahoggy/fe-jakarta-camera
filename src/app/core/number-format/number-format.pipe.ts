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

        // Format the number according to the specified locale without fraction digits
        const formattedNumber = new Intl.NumberFormat(locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numberValue);

        // Replace any comma with a dot (if necessary for the specified locale)
        return formattedNumber.replace(/,/g, '.');
    }

}
