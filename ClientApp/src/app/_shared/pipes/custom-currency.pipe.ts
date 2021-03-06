import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      return 'USD';
    }
    return 'VND';
  }
}
