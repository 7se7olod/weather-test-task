import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  isCollapsed = true;
  @Output() weatherCity = new EventEmitter<string>();
  searchCity(city: string) {
    this.weatherCity.emit(city);
    this.isCollapsed = false;
  }
}
