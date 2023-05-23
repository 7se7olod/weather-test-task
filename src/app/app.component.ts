import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {ChartOptions} from "./types/chart-options.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentWeather$ = this.weatherService.currentWeather$;
  public fiveDaysForecastWeather$ = this.weatherService.fiveDaysForecastWeather$;
  public isError$ = new BehaviorSubject<boolean>(false);
  public chartSeriesOptions$: Observable<ChartOptions> = this.weatherService.fiveDaysForecastWeather$.pipe(map((weatherList) => {
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
        text: "График погоды"
      },
      xaxis: {
        categories: (weatherList || []).map(weatherItem => `${new Date(weatherItem.dt * 1000).toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'long'
        })}`)
      }
    }
  }));

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      if (position.coords) {
        this.weatherService.getCurrentWeather('', position.coords.latitude, position.coords.longitude).subscribe();
        this.weatherService.getFiveDayWeatherForecast('', position.coords.latitude, position.coords.longitude).subscribe();
      }
    }, (error: GeolocationPositionError) => {
      this.weatherService.getCityFromIp().pipe(
      tap(ip => {
          this.weatherService.getCurrentWeather().subscribe();
          this.weatherService.getFiveDayWeatherForecast().subscribe();
      })).subscribe();
      throw error.message;
    });
  }

  public searchCityWeather(city: string) {
    if (city) {
      this.weatherService.getCurrentWeather(city).subscribe();
      this.weatherService.getFiveDayWeatherForecast(city).pipe(
        catchError(error => {
          this.isError$.next(true);
          setTimeout(() => {
            this.isError$.next(false);
          }, 3000)
          return of(null);
        })
      ).subscribe();
    }
  }
}
