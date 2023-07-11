import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FiveDayForecastWidgetComponent} from "./five-day-forecast-widget.component";
import {Response5DaysForecastType} from "../../types/response-five-days-forecast-weather.type";
import {DEFAULT_CHART_OPTIONS} from "./chart-options";

describe('FiveDayForecastWidgetComponent', () => {
  let fiveDayForecastWidgetComponent: FiveDayForecastWidgetComponent;
  let fixture: ComponentFixture<FiveDayForecastWidgetComponent>;
  let mock5daysResponse: Response5DaysForecastType;
  beforeEach(() => {
    mock5daysResponse = {
      cod: '200',
      message: 0,
      list: [
        {
          dt: 1689152400,
          main: {
            temp: 1,
            humidity: 1,
            pressure: 1,
          },
          weather: [{
            id: 1,
            description: '1',
            icon: '1',
          }],
          wind: {
            speed: 1,
            deg: 1,
            gust: 1,
          },
          visibility: 1,
          dt_txt: new Date(),
        },
      ],
    }
    TestBed.configureTestingModule({
      declarations: [FiveDayForecastWidgetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FiveDayForecastWidgetComponent);
    fiveDayForecastWidgetComponent = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should check fiveDayForecastWeather', function () {
    fiveDayForecastWidgetComponent.fiveDayForecastWeather = mock5daysResponse.list;
    expect(fiveDayForecastWidgetComponent.fiveDayForecastWeather).toEqual(mock5daysResponse.list);
  });

  it('should check chartSeriesOptions', function () {
    fiveDayForecastWidgetComponent.chartSeriesOptions = DEFAULT_CHART_OPTIONS;
    expect(fiveDayForecastWidgetComponent.chartSeriesOptions).toEqual(DEFAULT_CHART_OPTIONS);
  });

})
