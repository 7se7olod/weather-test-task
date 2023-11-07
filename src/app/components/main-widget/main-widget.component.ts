import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {StyleForTime} from "../../services/time-color.service";
import {WeatherType} from "../../types/weather.type";

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainWidgetComponent {
  @Input() currentWeather: WeatherType;
  @Input() styleForTime: StyleForTime;
}
