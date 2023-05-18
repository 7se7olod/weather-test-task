import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {List} from "../../types/response-five-days-forecast-weather.type";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentWeather$ = this.weatherService.currentWeather$;
  public fiveDaysForecastWeather$ = this.weatherService.fiveDaysForecastWeather$;
  public weatherFiveDays: List[] = []

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.weatherService.getCurrentWeather( '', position.coords.latitude, position.coords.longitude).subscribe();
      this.weatherService.getFiveDayWeatherForecast( '', position.coords.latitude, position.coords.longitude).subscribe();
      console.log(this.fiveDaysForecastWeather$);
    }, (error: GeolocationPositionError) => {
      this.weatherService.getCurrentWeather('Moscow').subscribe();
      this.weatherService.getFiveDayWeatherForecast('Moscow').subscribe();
      console.log(error.code);
    });
  }
}
