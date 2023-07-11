import {AppComponent} from "./app.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {WeatherService} from "./services/weather.service";
import {BehaviorSubject, of, tap, throwError} from "rxjs";
import {ChartOptions} from "./types/chart-options.type";
import {List} from "./types/response-five-days-forecast-weather.type";

describe('AppComponent ', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fakeWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(() => {
    fakeWeatherService = jasmine.createSpyObj('WeatherService', ['getCurrentWeather', 'getFiveDayWeatherForecast', 'getCityFromIp'], {
      currentWeather$: of(null),
      fiveDaysForecastWeather$: new BehaviorSubject<List[] | null>(null),
      isCollapsed$: of(true),
      city$: of(''),
    });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {provide: WeatherService, useValue: fakeWeatherService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should check if currentWeather$ exists', function () {
    expect(appComponent.currentWeather$).toBeDefined();
  });

  it('should check if fiveDaysForecastWeather$ exists', function () {
    expect(appComponent.fiveDaysForecastWeather$).toBeDefined();
  });

  it('should check if chartSeriesOptions$ exists', function () {
    expect(appComponent.chartSeriesOptions$).toBeDefined();
  });

  it('should check isError$ if city in function searchCityWeather incorrect', fakeAsync(() => {
    const mockErrorResponse = {status: 404, statusText: 'Not Found'};
    fakeWeatherService.getCurrentWeather.and.returnValue(of(null));
    fakeWeatherService.getFiveDayWeatherForecast.and.returnValue(throwError(mockErrorResponse));
    appComponent.searchCityWeather('1234567890');
    expect(appComponent.isError$.getValue()).toBeTruthy();
    tick(3000);
    expect(appComponent.isError$.getValue()).toBeFalsy();
  }))

  it('should check calls getCurrentWeather and getFiveDayWeatherForecast on ngOnInit', fakeAsync(() => {
    let fakePosition = {
      coords: {
        latitude: 51.5074,
        longitude: 0.1278
      },
      timestamp: 1
    };

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success: PositionCallback) => {
      success(fakePosition as GeolocationPosition);
    });

    fakeWeatherService.getCurrentWeather.and.returnValue(of(null));
    fakeWeatherService.getFiveDayWeatherForecast.and.returnValue(of(null));

    appComponent.ngOnInit();
    tick();

    expect(fakeWeatherService.getCurrentWeather).toHaveBeenCalledWith('', fakePosition.coords.latitude, fakePosition.coords.longitude);
    expect(fakeWeatherService.getFiveDayWeatherForecast).toHaveBeenCalledWith('', fakePosition.coords.latitude, fakePosition.coords.longitude);
  }));

  it('should check getCurrentWeather and getFiveDayWeatherForecast calls on ngOnInit if there is no geolocation access', fakeAsync(() => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success: PositionCallback, error: PositionErrorCallback) => {
      error({code: 1, message: 'Geolocation error'} as GeolocationPositionError);
    });

    fakeWeatherService.getCityFromIp.and.returnValue(of(null));
    fakeWeatherService.getCurrentWeather.and.returnValue(of(null));
    fakeWeatherService.getFiveDayWeatherForecast.and.returnValue(of(null));

    appComponent.ngOnInit();
    tick();

    expect(fakeWeatherService.getCurrentWeather).toHaveBeenCalledWith();
    expect(fakeWeatherService.getFiveDayWeatherForecast).toHaveBeenCalledWith();
  }));

  it('should transform weatherList into ChartOptions',() => {
    const weatherList: List[] = [
      {
        dt: 1630070400,
        main: {temp: 20, humidity: 1, pressure: 1},
        weather: [
          {
            id: 1,
            description: '1',
            icon: '1',
          }
        ],
        wind: {
          speed: 1,
          deg: 1,
          gust: 1,
        },
        visibility: 1,
        dt_txt: new Date(),
      },
      {
        dt: 1630156800,
        main: {temp: 25, humidity: 1, pressure: 1},
        weather: [
          {
            id: 1,
            description: '1',
            icon: '1',
          }
        ],
        wind: {
          speed: 1,
          deg: 1,
          gust: 1,
        },
        visibility: 1,
        dt_txt: new Date(),
      },
    ];
    appComponent.fiveDaysForecastWeather$.next(weatherList);
    let result: ChartOptions | undefined;
    appComponent.chartSeriesOptions$.subscribe((options) => {
      result = options;
    });

    expect(result).toEqual({
      series: [
        {
          name: 'Температура ºC',
          data: [20, 25],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'График погоды',
      },
      xaxis: {
        categories: ['27 августа', '28 августа'], // Здесь указывайте ожидаемые даты в соответствии с вашими данными
      },
    });
  });
})
