import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject, catchError, combineLatest, map, Observable, switchMap, take, tap} from "rxjs";
import {ResponseWeatherType} from "../types/response-weather.type";
import {List, Response5DaysForecastType} from "../types/response-five-days-forecast-weather.type";
import {environment} from "../../environments/environment";
import {ModalComponent} from "../components/modal/modal.component";
import {WeatherType} from "../types/weather.type";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weather$ = new BehaviorSubject<WeatherType | null>(null);
  isCollapsed$ = new BehaviorSubject<boolean>(true);
  private city$ = new BehaviorSubject<string>('');

  constructor(
    private readonly http: HttpClient,
    private readonly modalService: NgbModal,
  ) {
  }

  public getCityFromIp(): Observable<{ city: string }> {
    return this.http.get<{ ip: string }>('https://api.ipify.org/?format=json').pipe(
      switchMap((response) =>
        this.http.get<{ city: string }>(`https://ipapi.co/${response.ip}/json/`)
      ),
      tap((response) => {
        this.city$.next(response.city);
      }),
      take(1),
    )
  }

  getWeatherTEST(city?: string, longitude?: number, latitude?: number): Observable<WeatherType> {
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

    return combineLatest([
      this.http.get<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, {params}),
      this.http.get<Response5DaysForecastType>(environment.API_URL_FIVE_DAYS, {params})
    ]).pipe(
      map(([weather, fiveWeather]) => {
        const res = {
          cod: fiveWeather.cod,
          message: fiveWeather.message,
          list: fiveWeather.list.filter((weather: List) => new Date(weather.dt * 1000).getHours() > 12 && new Date(weather.dt * 1000).getHours() < 16),
        }
        return {
          ...weather,
          ...res
        } as WeatherType
      }),
      tap(weather => {
        this.weather$.next(weather);
      }),
      take(1),
      catchError((error: HttpErrorResponse) => {
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
    )
  }
}
