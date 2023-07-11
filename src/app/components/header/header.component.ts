import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  @Output() weatherCity = new EventEmitter<string>();
  @Input() isError = false;
  public cityForm = this.fb.group({
    city: ['', [Validators.required, Validators.pattern(new RegExp('^[а-яА-Яa-zA-Z]+(?:[\\s-][а-яА-Яa-zA-Z]+)*$'))]]
  });

  constructor(private fb: FormBuilder) {
  }

  public searchCity(city: string): void {
    if (city.trim()) {
      if (this.cityForm.valid) {
        this.weatherCity.emit(city);
      } else {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000)
      }
    }
  }
}
