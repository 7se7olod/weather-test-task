import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedTemperature'
})
export class TemperatureFormattingPipe implements PipeTransform {
  transform(temperature: number): string {
    const sign = temperature < 0 ? '-' : '+';
    return `${sign}${Math.round(temperature)}º`;
  }
}
