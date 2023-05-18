import {Component} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../modal/modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCollapsed = true;

  constructor(public weatherService: WeatherService,
              private modalService: NgbModal) {
  }

  public searchCityWeather(city: string, event: Event) {
    if (city) {
      this.weatherService.getCurrentWeather(city).pipe(
        catchError((error: HttpErrorResponse) => {
          switch (true) {
            case (error.status === 0):
              console.log(error.message);
              this.modalService.open(ModalComponent);
              return error.message;
              break;
            case (error.status === 404):
              console.log(error.message);
              this.isCollapsed = false;
              return error.message;
              break;
            case (error.status >= 500 && error.status <= 526):
              console.log(error.message);
              this.modalService.open(ModalComponent);
              break;
          }
          return error.message;
        }),
      ).subscribe();
      this.weatherService.getFiveDayWeatherForecast(city).pipe(
        catchError((error: HttpErrorResponse) => {
          switch (true) {
            case (error.status === 0):
              console.log(error.message);
              this.modalService.open(ModalComponent);
              return error.message;
              break;
            case (error.status === 404):
              console.log(error.message);
              this.isCollapsed = false;
              return error.message;
              break;
            case (error.status >= 500 && error.status <= 526):
              console.log(error.message);
              this.modalService.open(ModalComponent);
              break;
          }
          return error.message;
        }),
      ).subscribe();
    }

    setTimeout(() => {
      this.isCollapsed = true;
    }, 3000)
  }
}
