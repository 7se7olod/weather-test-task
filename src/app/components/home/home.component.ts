import {Component, OnInit} from '@angular/core';
import {CoordinateCityType, WeatherService} from "../../services/weather.service";
import {List} from "../../types/response-five-days-forecast-weather.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentWeather$ = this.weatherService.currentWeather$;
  public fiveDaysForecastWeather$ = this.weatherService.fiveDaysForecastWeather$;
  public coordinate: CoordinateCityType = {latitude: 0, longitude: 0};
  public weatherFiveDays: List[] = []

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.coordinate.longitude = position.coords.longitude;
      this.coordinate.latitude = position.coords.latitude;
      this.weatherService.getCurrentWeather( '', this.coordinate).subscribe();
      this.weatherService.getFiveDayWeatherForecast( '', this.coordinate).subscribe();
      // console.log(this.fiveDaysForecastWeather$);
    }, (error: GeolocationPositionError) => {
      // если нет доступа к данным
      this.weatherService.getCurrentWeather('Moscow').subscribe();
      this.weatherService.getFiveDayWeatherForecast('Moscow').subscribe();
      console.log(error.code);
    });
  }


}
