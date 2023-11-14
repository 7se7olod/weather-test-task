import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import {
  BehaviorSubject,
  catchError,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { ChartOptions } from './types/chart-options.type';
import { TimeColorService } from './services/time-color.service';
import { ChartService } from './services/chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  weather$ = this.weatherService.weather$;
  isError$ = new BehaviorSubject<boolean>(false);
  currentTime = new Date();
  styleColorTime = {
    backgroundCard: '#00c6ff',
    backgroundMain: 'white',
    fontColor: 'black',
    filter: 'none',
  };
  chartOptions$ = new BehaviorSubject<ChartOptions | null>(null);

  constructor(
    private readonly weatherService: WeatherService,
    private readonly timeColorService: TimeColorService,
    private readonly chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.getCurrentPosition();
  }

  private getCurrentPosition(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (position.coords) {
          this.weatherService
            .getWeather('', position.coords.longitude, position.coords.latitude)
            .pipe(
              tap((weather) => {
                this.styleColorTime = this.timeColorService.getStylesForTime(
                  weather.timezone
                );
              }),
              switchMap((weather) =>
                this.chartService
                  .getChartOptions(weather)
                  .pipe(tap((options) => this.chartOptions$.next(options)))
              ),
              take(1)
            )
            .subscribe();
        }
      },
      () => {
        this.weatherService
          .getCityFromIp()
          .pipe(
            switchMap((city) => this.weatherService.getWeather(city.city)),
            tap((weather) => {
              this.styleColorTime = this.timeColorService.getStylesForTime(
                weather.timezone
              );
            }),
            switchMap((weather) =>
              this.chartService
                .getChartOptions(weather)
                .pipe(tap((options) => this.chartOptions$.next(options)))
            ),
            take(1)
          )
          .subscribe();
      }
    );
  }

  searchCityWeather(city: string): void {
    if (city) {
      this.weatherService
        .getWeather(city)
        .pipe(
          tap(
            (weather) =>
              (this.styleColorTime = this.timeColorService.getStylesForTime(
                weather.timezone
              ))
          ),
          switchMap((weather) => this.chartService.getChartOptions(weather)),
          take(1),
          catchError((error) => {
            this.isError$.next(true);
            setTimeout(() => {
              this.isError$.next(false);
            }, 1000);
            return throwError(error.error.message);
          })
        )
        .subscribe();
    }
  }
}
