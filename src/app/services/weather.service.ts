import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ResponseWeatherType} from "../types/response-weather.type";
import {List, Response5DaysForecastType} from "../types/response-five-days-forecast-weather.type";
import {environment} from "../../environments/environment";

export type CoordinateCityType = {
  latitude: number,
  longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public currentWeather$ = new BehaviorSubject<ResponseWeatherType | null>(null);
  public fiveDaysForecastWeather$ = new BehaviorSubject<List[] | null>(null);

  constructor(private http: HttpClient) {

  }

  public getCurrentWeather(city?: string, latitude?: number, longitude?: number): Observable<ResponseWeatherType> {
    const params = {
      lang: 'ru',
      units: 'metric',
      appid: environment.API_KEY,
      q: '',
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
      params.q = 'Moscow';
    }

    return this.http.get<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, {params})
      .pipe(
        tap((result: ResponseWeatherType) => {
          if (result) {
            this.currentWeather$.next(result);
          }
        })
      );
  }

  public getFiveDayWeatherForecast(city?: string, latitude?: number, longitude?: number): Observable<Response5DaysForecastType> {
    const params = {
      lang: 'ru',
      units: 'metric',
      appid: environment.API_KEY,
      q: '',
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
      params.q = 'Moscow';
    }

    return this.http.get<Response5DaysForecastType>(environment.API_URL_FIVE_DAYS, {params})
      .pipe(
        tap(weatherForecast => {
          // фильтрую список
          this.fiveDaysForecastWeather$
            .next(weatherForecast.list
              .filter((weather: List) => new Date(weather.dt * 1000).getHours() === 13))
        })
      );
  }
}
