export type ResponseWeatherType = {
  weather: Weather[];
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: { all: number };
  name: string;
  cod: number;
  dt: number;
  timezone: number;
};

export type Main = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};
