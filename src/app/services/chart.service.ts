import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {WeatherService} from "./weather.service";
import {ChartOptions} from "../types/chart-options.type";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  chartOptions$: Observable<ChartOptions> = this.weatherService.fiveDaysForecastWeather$.pipe(map((weatherList) => {
    return {
      series: [
        {
          name: "Температура ºC",
          data: (weatherList || []).map(weatherItem => Math.round(weatherItem.main.temp)),
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "График погоды",
      },
      xaxis: {
        categories: (weatherList || []).map(weatherItem => `${new Date(weatherItem.dt * 1000).toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'long'
        })}`)
      }
    }
  }));

  constructor(private readonly weatherService: WeatherService,) { }
}
