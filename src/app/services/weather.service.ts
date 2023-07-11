import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, switchMap, tap} from "rxjs";
import {ResponseWeatherType} from "../types/response-weather.type";
import {List, Response5DaysForecastType} from "../types/response-five-days-forecast-weather.type";
import {environment} from "../../environments/environment";
import {ModalComponent} from "../components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public currentWeather$ = new BehaviorSubject<ResponseWeatherType | null>(null);
  public fiveDaysForecastWeather$ = new BehaviorSubject<List[] | null>(null);
  public isCollapsed$ = new BehaviorSubject<boolean>(true);
  private city$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,
              private modalService: NgbModal) {}

  public getCityFromIp(): Observable<{ city: string }> {
    return this.http.get<{ ip: string }>('https://api.ipify.org/?format=json').pipe(
      switchMap((response) =>
        this.http.get<{ city: string }>(`https://ipapi.co/${response.ip}/json/`)
      ),
      tap((response) => {
        this.city$.next(response.city);
      })
    )
  }

  public getCurrentWeather(city?: string, latitude?: number, longitude?: number): Observable<ResponseWeatherType> {
    const params = {
      lang: 'ru',
      units: 'metric',
      appid: environment.API_KEY,
      q: this.city$.getValue(),
      lon: 0,
      lat: 0
    }
    if (city) {
      params.q = city;
    }
    if (latitude && longitude) {
      params.lon = longitude;
      params.lat = latitude;
    }
    if (!city && !latitude && !longitude) {
      params.q = this.city$.getValue();
    }

    return this.http.get<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, {params})
      .pipe(
        tap((result: ResponseWeatherType) => {
          if (result) {
            this.currentWeather$.next(result);
          }
        }),
        catchError( (error: HttpErrorResponse) => {
          if (error.status) {
            switch (true) {
              case (error.status === 404):
                this.isCollapsed$.next(false);
                break;
              case (error.status >= 500 && error.status <= 526):
                this.modalService.open(ModalComponent);
                break;
            }
          }
          throw error;
        })
      );
  }

  public getFiveDayWeatherForecast(city?: string, latitude?: number, longitude?: number): Observable<Response5DaysForecastType> {
    const params = {
      lang: 'ru',
      units: 'metric',
      appid: environment.API_KEY,
      q: this.city$.getValue(),
      lon: 0,
      lat: 0
    }

    if (city) {
      params.q = city;
    }

    if (latitude && longitude) {
      params.lon = longitude;
      params.lat = latitude;
    }
    if (!city && !latitude && !longitude) {
      params.q = this.city$.getValue();
    }

    return this.http.get<Response5DaysForecastType>(environment.API_URL_FIVE_DAYS, {params})
      .pipe(
        tap(weatherForecast => {
          this.fiveDaysForecastWeather$
            .next(weatherForecast.list
              .filter((weather: List) => new Date(weather.dt * 1000).getHours() > 12 && new Date(weather.dt * 1000).getHours() < 16)
            )
        }),
        catchError(error => {
          switch (true) {
            case (error.status === 0):
              this.modalService.open(ModalComponent);
              break;
            case (error.status === 404):
              this.isCollapsed$.next(false)
              break;
            case (error.status >= 500 && error.status <= 526):
              this.modalService.open(ModalComponent);
              break;
          }
          throw error;
        })
      );
  }
}
