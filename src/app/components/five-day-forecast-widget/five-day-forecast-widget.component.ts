import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {List} from "../../types/response-five-days-forecast-weather.type";
import {ChartComponent} from "ng-apexcharts";
import {ChartOptions} from "../../types/chart-options.type";

@Component({
  selector: 'app-five-day-forecast-widget',
  templateUrl: './five-day-forecast-widget.component.html',
  styleUrls: ['./five-day-forecast-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiveDayForecastWidgetComponent {
  @ViewChild("chart") chart: ChartComponent;
  @Input() fiveDayForecastWeather: List[];
  @Input() chartSeriesOptions: ChartOptions;
}
