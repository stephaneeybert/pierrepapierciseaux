import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { SwUpdateServerMock } from './swupdate-server.mock.service';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const translateServiceSpy: { getTheValue: jasmine.Spy } = jasmine.createSpyObj('TranslateService', ['getTheValue']);
    const stubValue = 'stub value';
    translateServiceSpy.getTheValue.and.returnValue(stubValue);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        TranslateService,
        { provide: SwUpdate, useClass: SwUpdateServerMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    appComponent = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

});
