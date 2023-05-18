import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbCollapseModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TemperatureFormattingPipe } from './pipes/temperature-formatting.pipe';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import { ModalComponent } from './components/modal/modal.component';
registerLocaleData(localeRu, "ru");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemperatureFormattingPipe,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
