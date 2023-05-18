import { Component } from '@angular/core';
import {WeatherService} from "../../../services/weather.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public weatherService: WeatherService) {
  }
  searchCityWeather(city: string, event: Event) {
    if (city) {
      this.weatherService.getCurrentWeather(city).subscribe();
      this.weatherService.getFiveDayWeatherForecast(city).subscribe();
    }
    event.stopImmediatePropagation();
  }
}
