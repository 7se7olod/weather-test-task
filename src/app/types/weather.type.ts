import {List} from "./response-five-days-forecast-weather.type";
import {Main, Weather, Wind} from "./response-weather.type";

export type WeatherType = {
  cod: string;
  message: number;
  list: List[];
  weather: Weather[];
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: { all: number; };
  name: string;
  dt: number;
  timezone: number;
}
