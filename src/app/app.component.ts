import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {BehaviorSubject, catchError, combineLatest, Observable, of, take, tap} from "rxjs";
import {ChartOptions} from "./types/chart-options.type";
import {environment} from "../environments/environment";
import {ResponseWeatherType} from "./types/response-weather.type";
import {Response5DaysForecastType} from "./types/response-five-days-forecast-weather.type";
import {TimeColorService} from "./services/time-color.service";
import {ChartService} from "./services/chart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public currentWeather$ = this.weatherService.currentWeather$;
  public fiveDaysForecastWeather$ = this.weatherService.fiveDaysForecastWeather$;
  public isError$ = new BehaviorSubject<boolean>(false);
  public styleColorTime = {backgroundCard: '#00c6ff', backgroundMain: 'white', fontColor: 'black', filter: 'none'};
  public chartSeriesOptions$: Observable<ChartOptions> = this.chartService.chartOptions$;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly timeColorService: TimeColorService,
    private readonly chartService: ChartService,
  ) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      if (position.coords) {
        this.weatherService.getWeather<ResponseWeatherType>(
          environment.API_URL_CURRENT_WEATHER,
          (result) => this.weatherService.updateCurrentWeather(result),
          '',
          position.coords.latitude,
          position.coords.longitude
        ).pipe(
          tap(weather => {
            this.styleColorTime = this.timeColorService.getStylesForTime(weather.timezone);
          }),
          take(1),
        )
          .subscribe();

        this.weatherService.getWeather<Response5DaysForecastType>(
          environment.API_URL_FIVE_DAYS,
          (weatherForecast) => this.weatherService.filteringWeatherListForFiveDays(weatherForecast),
          '',
          position.coords.latitude,
          position.coords.longitude)
          .subscribe();
      }
    }, (error: GeolocationPositionError) => {
      combineLatest([
        this.weatherService.getCityFromIp(),
        this.weatherService.getWeather<ResponseWeatherType>(
          environment.API_URL_CURRENT_WEATHER,
          (weather) => {
            this.styleColorTime = this.timeColorService.getStylesForTime(weather.timezone);
            this.weatherService.updateCurrentWeather(weather)
          }),
        this.weatherService.getWeather<Response5DaysForecastType>(
          environment.API_URL_FIVE_DAYS,
          (weatherForecast) => this.weatherService.filteringWeatherListForFiveDays(weatherForecast)
        )]);


      this.weatherService.getCityFromIp()
        .pipe(
          tap(city => {
            console.log(city);
            this.weatherService.getWeather<ResponseWeatherType>(
              environment.API_URL_CURRENT_WEATHER,
              (weather) => {
                this.styleColorTime = this.timeColorService.getStylesForTime(weather.timezone);
                this.weatherService.updateCurrentWeather(weather)
              })
              .subscribe();

            this.weatherService.getWeather<Response5DaysForecastType>(
              environment.API_URL_FIVE_DAYS,
              (weatherForecast) => this.weatherService.filteringWeatherListForFiveDays(weatherForecast)
            ).subscribe();
          }),
          take(1),)
        .subscribe();
    });
  }

  public searchCityWeather(city: string): void {
    if (city) {
      this.weatherService.getWeather<ResponseWeatherType>(
        environment.API_URL_CURRENT_WEATHER,
        (result) => this.weatherService.updateCurrentWeather(result), city).pipe(
        tap((weather) => {
          this.styleColorTime = this.timeColorService.getStylesForTime(weather.timezone);
        }),
        take(1),
      )
        .subscribe();

      this.weatherService.getWeather<Response5DaysForecastType>(
        environment.API_URL_FIVE_DAYS,
        (weatherForecast) => this.weatherService.filteringWeatherListForFiveDays(weatherForecast), city)
        .pipe(
          catchError(error => {
            this.isError$.next(true);
            setTimeout(() => {
              this.isError$.next(false);
            }, 3000)
            return of(null);
            take(1);
          })).subscribe();
    }
  }
}
