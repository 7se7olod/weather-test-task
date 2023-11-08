import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppComponent } from './app.component';
import { MainWidgetComponent } from './components/main-widget/main-widget.component';
import { TemperatureFormattingPipe } from './pipes/temperature-formatting.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { FiveDayForecastWidgetComponent } from './components/five-day-forecast-widget/five-day-forecast-widget.component';
import { HeaderComponent } from './components/header/header.component';
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainWidgetComponent,
    TemperatureFormattingPipe,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    FiveDayForecastWidgetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgApexchartsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
