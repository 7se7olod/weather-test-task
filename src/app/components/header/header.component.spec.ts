import {HeaderComponent} from "./header.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgbModule],
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    headerComponent = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('должен создать HeaderComponent', () => {
    expect(headerComponent).toBeDefined();
  });

  it('должен проверить поле city на пустоту в cityForm', () => {
    headerComponent.cityForm.setValue({
      city: ' /n',
    })
    expect(headerComponent.cityForm.valid).toBeFalsy();
  });

  it('должен проверить поле city в cityForm, строка должна быть и на русском и на английском', () => {
    headerComponent.cityForm.setValue({
      city: 'Moscow',
    })
    expect(headerComponent.cityForm.valid).toBeTruthy();

    headerComponent.cityForm.setValue({
      city: 'Москва',
    })
    expect(headerComponent.cityForm.valid).toBeTruthy();
  });

  it('должен проверить поле city в cityForm, что значение не должно содержать числа', () => {
    headerComponent.cityForm.setValue({
      city: '1234567890',
    })
    expect(headerComponent.cityForm.valid).toBeFalsy();
  });

  it('должен проверить isError на существование и на false', () => {
    expect(headerComponent.isError).toBeDefined();
    expect(headerComponent.isError).toBeFalsy();
  });

  it('должен вызывать функцию searchCity с корректным аргументом при клике на кнопку',  () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.form-input');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.form-button');
    spyOn(headerComponent, 'searchCity');

    input.value = 'Moscow';
    button.click();

    expect(headerComponent.searchCity).toHaveBeenCalledWith('Moscow');
  });

  describe('searchCity', () => {
    it('должен проверять isError при передаче некорректного значения', fakeAsync(() => {
      headerComponent.searchCity('12');
      expect(headerComponent.isError).toBe(true);
      tick(3000);
      expect(headerComponent.isError).toBe(false);
    }));

    it('должна проверять weatherCity при валидном значении формы', () => {
      spyOn(headerComponent.weatherCity, 'emit');
      headerComponent.cityForm.controls['city'].setValue('Moscow');
      headerComponent.searchCity('Moscow');
      expect(headerComponent.weatherCity.emit).toHaveBeenCalledWith('Moscow');
    });
  });
})
