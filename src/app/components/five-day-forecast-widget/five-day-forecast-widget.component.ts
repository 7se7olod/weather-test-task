import {Component, Input, ViewChild} from '@angular/core';
import {DEFAULT_CHART_OPTIONS} from "./chart-options";
import {List} from "../../types/response-five-days-forecast-weather.type";
import {
  ChartComponent,
} from "ng-apexcharts";
import {ChartOptions} from "../../types/chart-options.type";


@Component({
  selector: 'app-five-day-forecast-widget',
  templateUrl: './five-day-forecast-widget.component.html',
  styleUrls: ['./five-day-forecast-widget.component.scss']
})
export class FiveDayForecastWidgetComponent {
  @ViewChild("chart") chart: ChartComponent;
  @Input() fiveDayForecastWeather: List[];
  @Input() chartSeriesOptions: ChartOptions;
}
