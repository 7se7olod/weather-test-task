import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ResponseWeatherType} from "../../types/response-weather.type";

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainWidgetComponent {
  @Input() currentWeather: ResponseWeatherType;
}
