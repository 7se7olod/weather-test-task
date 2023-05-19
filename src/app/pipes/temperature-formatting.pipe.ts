import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedTemperature'
})
export class TemperatureFormattingPipe implements PipeTransform {
  transform(temperature: number): string {
    if (temperature) {
      const sign = temperature < 0 ? '-' : '+';
      return `${sign}${Math.round(temperature)}º`;
    }
    return '';
  }
}
