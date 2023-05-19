import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainWidgetComponent} from './components/main-widget/main-widget.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbCollapseModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TemperatureFormattingPipe } from './pipes/temperature-formatting.pipe';
import { FooterComponent } from './components/footer/footer.component';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import { ModalComponent } from './components/modal/modal.component';
import { FiveDayForecastWidgetComponent } from './components/five-day-forecast-widget/five-day-forecast-widget.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {HeaderComponent} from "./components/header/header.component";
registerLocaleData(localeRu, "ru");

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
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    NgApexchartsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
