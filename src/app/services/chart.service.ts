import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartOptions } from '../types/chart-options.type';
import { WeatherType } from '../types/weather.type';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  getChartOptions(weather: WeatherType): Observable<ChartOptions> {
    return of({
      series: [
        {
          name: 'Температура ºC',
          data: weather.list.map((weatherItem) =>
            Math.round(weatherItem.main.temp)
          ),
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'График погоды',
      },
      xaxis: {
        categories: weather.list.map(
          (weatherItem) =>
            `${new Date(weatherItem.dt * 1000).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'long',
            })}`
        ),
      },
    });
  }
}
