import { Injectable } from '@angular/core';

export type StyleForTime = {
  backgroundCard: string;
  backgroundMain: string;
  fontColor: string;
  filter: string;
};

@Injectable({
  providedIn: 'root',
})
export class TimeColorService {
  private styleForTime: StyleForTime = {
    backgroundCard: '#00c6ff',
    backgroundMain: 'white',
    fontColor: 'black',
    filter: 'none',
  };

  getStylesForTime(timezone: number): StyleForTime {
    const currentHour = new Date().getUTCHours() + timezone / 3600;
    switch (true) {
      case currentHour >= 4 && currentHour < 6:
        this.styleForTime.backgroundCard =
          'linear-gradient(45deg, rgba(255,197,48,1) 0%, rgba(40,188,223,1) 48%, rgba(48,129,227,1) 95%)';
        this.styleForTime.backgroundMain =
          'radial-gradient(circle, rgba(255,255,218,1) 0%, rgba(137,232,255,1) 100%)';
        this.styleForTime.fontColor = 'white';
        this.styleForTime.filter = 'invert(1)';
        break;
      case currentHour >= 6 && currentHour < 12:
        this.styleForTime.backgroundCard =
          'radial-gradient(circle, rgba(14,211,231,1) 0%, rgba(185,231,128,1) 100%)';
        this.styleForTime.backgroundMain =
          'radial-gradient(circle, rgba(255,245,218,1) 0%, rgba(149,210,255,1) 100%)';
        this.styleForTime.fontColor = 'black';
        this.styleForTime.filter = 'none';
        break;
      case currentHour >= 12 && currentHour < 18:
        this.styleForTime.backgroundCard =
          'radial-gradient(circle, rgba(52,255,243,1) 0%, rgba(40,188,223,1) 100%)';
        this.styleForTime.backgroundMain =
          'radial-gradient(circle, rgba(218,255,255,1) 0%, rgba(134,203,255,1) 100%)';
        this.styleForTime.fontColor = 'black';
        this.styleForTime.filter = 'none';
        break;
      case currentHour >= 18 && currentHour < 20:
        this.styleForTime.backgroundCard =
          'linear-gradient(137deg, rgba(13,60,139,1) 0%, rgba(48,129,227,1) 19%, rgba(40,188,223,1) 74%, rgba(242,204,106,1) 100%)';
        this.styleForTime.backgroundMain =
          'radial-gradient(circle, rgba(255,221,219,1) 0%, rgba(101,172,221,1) 100%)';
        this.styleForTime.fontColor = 'white';
        this.styleForTime.filter = 'invert(1)';
        break;
      case currentHour >= 20 && currentHour < 22:
        this.styleForTime.backgroundCard =
          'linear-gradient(137deg, rgba(49,63,142,1) 0%, rgba(13,60,139,1) 39%, rgba(31,86,153,1) 71%, rgba(255,184,0,1) 100%)';
        this.styleForTime.backgroundMain =
          'radial-gradient(circle, rgba(219,236,255,1) 0%, rgba(93,70,148,1) 100%)';
        this.styleForTime.fontColor = 'white';
        this.styleForTime.filter = 'invert(1)';
        break;
      default:
        this.styleForTime.backgroundCard =
          'linear-gradient(137deg, rgba(26,34,83,1) 0%, rgba(13,60,139,1) 63%, rgba(48,129,227,1) 100%, rgba(255,184,0,1) 100%)';
        this.styleForTime.backgroundMain =
          'radial-gradient(circle, rgba(219,236,255,1) 0%, rgba(93,70,148,1) 100%)';
        this.styleForTime.fontColor = 'white';
        this.styleForTime.filter = 'invert(1)';
        break;
    }

    return this.styleForTime;
  }
}
