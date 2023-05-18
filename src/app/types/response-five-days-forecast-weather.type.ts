export type Response5DaysForecastType = {
  cod:     string;
  message: number;
  list:    List[];
}

export type List = {
  dt:         number;
  main:       MainClass;
  weather:    Weather[];
  wind:       Wind;
  visibility: number;
  pop:        number;
  dt_txt:     Date;
}

export type MainClass = {
  temp:       number;
  humidity: number;
  pressure: number;
}

export type Weather = {
  id:          number;
  description: string;
  icon:        string;
}

export type Wind = {
  speed: number;
  deg:   number;
  gust:  number;
}
