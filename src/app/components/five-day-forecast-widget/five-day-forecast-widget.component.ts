import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../../types/chart-options.type';
import { StyleForTime } from '../../services/time-color.service';
import { WeatherType } from '../../types/weather.type';

@Component({
  selector: 'app-five-day-forecast-widget',
  templateUrl: './five-day-forecast-widget.component.html',
  styleUrls: ['./five-day-forecast-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiveDayForecastWidgetComponent {
  @ViewChild('chart') chart: ChartComponent;
  @Input() fiveDayForecastWeather: WeatherType;
  @Input() chartSeriesOptions: ChartOptions;
  @Input() styleForTime: StyleForTime;
}
