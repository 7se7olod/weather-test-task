import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styles: [
    `
      header {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.75);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() weatherCity = new EventEmitter<string>();
  @Input() isError = false;
  cityForm = this.fb.group({
    city: [
      '',
      [
        Validators.required,
        Validators.pattern(
          new RegExp('^[а-яА-Яa-zA-Z]+(?:[\\s-][а-яА-Яa-zA-Z]+)*$')
        ),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}

  searchCity(city: string): void {
    this.weatherCity.emit(city);
  }
}
