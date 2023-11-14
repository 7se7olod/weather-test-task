import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { StyleForTime } from '../../services/time-color.service';
import { WeatherType } from '../../types/weather.type';

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainWidgetComponent implements OnInit {
  currentTime = new Date();
  @Input() timezone: number = undefined;
  @Input() currentWeather: WeatherType;
  @Input() styleForTime: StyleForTime;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateCurrentTime();
  }

  private updateCurrentTime(): void {
    setInterval(() => {
      if (this.timezone !== undefined) {
        const timezoneOffsetMilliseconds = this.timezone * 1000;
        const localTimezoneOffsetMilliseconds =
          new Date().getTimezoneOffset() * 60 * 1000;
        this.currentTime = new Date(
          new Date().getTime() +
            timezoneOffsetMilliseconds +
            localTimezoneOffsetMilliseconds
        );
        this.cdr.detectChanges();
      }
    }, 1000);
  }
}
