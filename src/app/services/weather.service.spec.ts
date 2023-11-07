import {WeatherService} from "./weather.service";
import {TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ResponseWeatherType} from "../types/response-weather.type";
import {environment} from "../../environments/environment";
import {ModalComponent} from "../components/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Response5DaysForecastType} from "../types/response-five-days-forecast-weather.type";
import any = jasmine.any;

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let httpTestingController: HttpTestingController;
  let mockCurrentResponse: ResponseWeatherType;
  let mock5daysResponse: Response5DaysForecastType;
  let fakeModalService: NgbModal;
  let mockIpResponse: { ip: string };
  let mockCityResponse: { city: string };
  let latitude: number;
  let longitude: number;

  beforeEach(() => {
    let mockCurrentResponse = {
      weather: [{
        id: 1,
        main: '1',
        description: '1',
        icon: '1',
      }],
      main: {
        temp: 1,
        feels_like: 1,
        pressure: 1,
        humidity: 1,
      },
      visibility: 1,
      wind: {
        speed: 1,
        deg: 1,
        gust: 1,
      },
      clouds: {all: 1},
      name: '',
      cod: 1,
      dt: 1,
      timezone: 1,
    };
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
    mockIpResponse = {ip: '123.456.789.0'};
    mockCityResponse = {city: 'Moscow'};
    latitude = 55.755826;
    longitude = 37.6173;

    fakeModalService = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ModalComponent],
      providers: [
        WeatherService,
        {provide: NgbModal, useValue: fakeModalService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    weatherService = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', function () {
    expect(weatherService).toBeDefined();
  });

  it('should create currentWeather$', function () {
    expect(weatherService.currentWeather$).toBeDefined();
  });

  it('should create fiveDaysForecastWeather$', function () {
    expect(weatherService.fiveDaysForecastWeather$).toBeDefined();
  });

  it('should create isCollapsed$', function () {
    expect(weatherService.isCollapsed$).toBeDefined();
  });

  it('should check getCityFromIp and return current city from ip', async () => {
    weatherService.getCityFromIp().subscribe((result) => {
      expect(result).toEqual(mockCityResponse);
    })

    const ipRequest = httpTestingController.expectOne('https://api.ipify.org/?format=json');
    expect(ipRequest.request.method).toBe('GET');
    ipRequest.flush(mockIpResponse);

    const cityRequest = httpTestingController.expectOne(`https://ipapi.co/${mockIpResponse.ip}/json/`);
    expect(cityRequest.request.method).toBe('GET');
    cityRequest.flush(mockCityResponse);
  });


  it('should make a getCurrentWeather request with the correct city parameter and update currentWeather$', () => {
    mockCurrentResponse.name = 'Moscow'
    weatherService.getWeather<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, (result) => weatherService.updateCurrentWeather(result), 'Moscow').subscribe();
    const req = httpTestingController.expectOne(request => {
      return request.urlWithParams === `${environment.API_URL_CURRENT_WEATHER}lang=ru&units=metric&appid=${environment.API_KEY}&q=${mockCurrentResponse.name}&lon=0&lat=0`;
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockCurrentResponse);
    expect(weatherService.currentWeather$.getValue()).toEqual(mockCurrentResponse);
  });

  it('should call getCurrentWeather request with the correct latitude and longitude parameters and update currentWeather$ ', function () {
    weatherService.getWeather<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, (result) => weatherService.updateCurrentWeather(result), '', latitude, longitude).subscribe();
    const req = httpTestingController.expectOne(request => {
      return request.urlWithParams === `${environment.API_URL_CURRENT_WEATHER}lang=ru&units=metric&appid=${environment.API_KEY}&q=&lon=${longitude}&lat=${latitude}`;
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockCurrentResponse);
    expect(weatherService.currentWeather$.getValue()).toEqual(mockCurrentResponse);
  });

  it('call getCurrentWeather without parameters and update currentWeather$', function () {
    weatherService.getWeather<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, (result) => weatherService.updateCurrentWeather(result)).subscribe();
    const req = httpTestingController.expectOne(request => {
      return request.urlWithParams === `${environment.API_URL_CURRENT_WEATHER}lang=ru&units=metric&appid=${environment.API_KEY}&q=&lon=0&lat=0`;
    })
    expect(req.request.method).toBe('GET');
    req.flush(mockCurrentResponse);
    expect(weatherService.currentWeather$.getValue()).toEqual(mockCurrentResponse);
  });

  it('should call getCurrentWeather request error with status code 404 and update isCollapsed$', () => {
    const mockErrorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not found'
    });

    spyOn(weatherService.isCollapsed$, 'next');
    weatherService.getWeather(environment.API_URL_CURRENT_WEATHER, () => {
    }).subscribe(
      () => {
        // Обработка успешного ответа (не требуется в данном случае)
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(mockErrorResponse.status);
        expect(error.statusText).toBe(mockErrorResponse.statusText);
      }
    );

    const req = httpTestingController.expectOne(`${environment.API_URL_CURRENT_WEATHER}lang=ru&units=metric&appid=${environment.API_KEY}&q=&lon=0&lat=0`);
    expect(req.request.method).toEqual('GET');
    req.flush(null, mockErrorResponse);
    expect(weatherService.isCollapsed$.next).toHaveBeenCalledWith(false);
  });

  it('should call getCurrentWeather request error with status code 500 and check modalService open method call', () => {
    const mockResponseError = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    })

    weatherService.getWeather<ResponseWeatherType>(environment.API_URL_CURRENT_WEATHER, () => {
    },).subscribe(
      () => {
      },
      error => {
        expect(error.status).toBe(mockResponseError.status);
        expect(error.statusText).toBe(mockResponseError.statusText);
      }
    )
    const req = httpTestingController.expectOne(`${environment.API_URL_CURRENT_WEATHER}lang=ru&units=metric&appid=${environment.API_KEY}&q=&lon=0&lat=0`);
    expect(req.request.method).toEqual('GET');
    req.flush(null, mockResponseError);
    expect(fakeModalService.open).toHaveBeenCalledWith(ModalComponent);
  })
})
