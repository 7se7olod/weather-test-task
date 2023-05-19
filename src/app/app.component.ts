import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {catchError, map, Observable} from "rxjs";
import {ChartOptions} from "./types/chart-options.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentWeather$ = this.weatherService.currentWeather$;
  public fiveDaysForecastWeather$ = this.weatherService.fiveDaysForecastWeather$;
  public chartSeriesOptions$: Observable<ChartOptions> = this.weatherService.fiveDaysForecastWeather$.pipe(map((weatherList) => {
    return {
      series: [
        {
          name: "My-series",
          data: (weatherList || []).map(weatherItem => weatherItem.main.temp),
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
        categories: (weatherList || []).map(weatherItem => new Date(weatherItem.dt * 1000).getDate())
      },
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
      this.weatherService.getCurrentWeather('Moscow').subscribe();
      this.weatherService.getFiveDayWeatherForecast('Moscow').subscribe();
      throw error.message;
    });
  }

  public searchCityWeather(city: string) {
    if (city) {
      this.weatherService.getCurrentWeather(city).subscribe();
      this.weatherService.getFiveDayWeatherForecast(city).pipe(
        catchError(error => {
          // this.isCollapsed = false;
          return error.message;
        })
      ).subscribe();
    }

    setTimeout(() => {
      // this.isCollapsed = true;
    }, 3000)
  }
}
