import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

const ENGLISH_LANGUAGE = 'en';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
      imports: [
        TranslateTestingModule
          .withTranslations(ENGLISH_LANGUAGE, require('assets/i18n/en.json'))
          .withDefaultLanguage(ENGLISH_LANGUAGE)
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  it(`should have no weapons`, () => {
    expect(component.playerWeapon).toEqual(0);
    expect(component.opponentWeapon).toEqual(0);
  });

  it('should render the opponent header', () => {
    const element: HTMLElement = fixture.nativeElement;
    const headers: NodeList = element.querySelectorAll('mat-toolbar h2');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent?.trim()).toContain('Opponent');
    expect(headers[1].textContent?.trim()).toContain('Me');
  });

  it('should have picked an opponent weapon', async(() => {
    component.opponentPickWeapon();
    fixture.whenStable().then(() => {
      expect(component.opponentWeapon).toBeGreaterThanOrEqual(1);
    })
  }));
});