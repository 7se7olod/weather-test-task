import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ResponseWeatherType} from "../types/response-weather.type";
import {List, Response5DaysForecastType} from "../types/response-five-days-forecast-weather.type";

export type CoordinateCityType = {
  latitude: number,
  longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly constants = {
    urlCurrentForecast: 'https://api.openweathermap.org/data/2.5/weather?',
    urlFiveDaysForecast: 'https://api.openweathermap.org/data/2.5/forecast?',
    apiId: '347f869ad56cdd4181acc109b1c836d3',
  }
  public currentWeather$ = new BehaviorSubject<ResponseWeatherType | null>(null);
  public fiveDaysForecastWeather$ = new BehaviorSubject<List[] | null>(null);

  constructor(private http: HttpClient) {
  }

  public getCurrentWeather(city?: string, coordinate?: CoordinateCityType): Observable<ResponseWeatherType> {
    const params = {
      lang: 'ru',
      units: 'metric',
      appid: this.constants.apiId,
      q: '',
      lon: 0,
      lat: 0
    }
    if (city) {
      params.q = city;
    }
    if (coordinate) {
      params.lon = coordinate.longitude;
      params.lat = coordinate.latitude;
    }
    if (!city && !coordinate) {
      params.q = 'Moscow';
    }

    return this.http.get<ResponseWeatherType>(this.constants.urlCurrentForecast, {params})
      .pipe(
        tap((result: ResponseWeatherType) => {
          if (result) {
            this.currentWeather$.next(result);
          }
        })
      );
  }

  public getFiveDayWeatherForecast(city?: string, coordinate?: CoordinateCityType): Observable<Response5DaysForecastType> {
    const params = {
      lang: 'ru',
      units: 'metric',
      appid: this.constants.apiId,
      q: '',
      lon: 0,
      lat: 0
    }

    if (city) {
      params.q = city;
    }

    if (coordinate) {
      params.lon = coordinate.longitude;
      params.lat = coordinate.latitude;
    }

    if (!city && !coordinate) {
      params.q = 'Moscow';
    }

    return this.http.get<Response5DaysForecastType>(this.constants.urlFiveDaysForecast, {params})
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
