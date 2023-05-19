import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  @Output() weatherCity = new EventEmitter<string>();
  @Input() isError = false;

  searchCity(city: string) {
    this.weatherCity.emit(city);
  }
}
