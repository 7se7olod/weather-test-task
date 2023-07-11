import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MainWidgetComponent} from "./main-widget.component";
import {ResponseWeatherType} from "../../types/response-weather.type";

describe('MainWidgetComponent', () => {
  let mainWidgetComponent: MainWidgetComponent;
  let fixture: ComponentFixture<MainWidgetComponent>;
  let mockCurrentResponse: ResponseWeatherType;

  beforeEach(() => {
    mockCurrentResponse = {
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
    };

    TestBed.configureTestingModule({
      declarations: [MainWidgetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainWidgetComponent);
    mainWidgetComponent = fixture.componentInstance;
  })

  it('should check currentWeather', function () {
    expect(mainWidgetComponent.currentWeather).toBeUndefined();
    mainWidgetComponent.currentWeather = mockCurrentResponse;
    expect(mainWidgetComponent.currentWeather).toBeDefined();
  });
})
