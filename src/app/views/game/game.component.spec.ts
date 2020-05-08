import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

const ENGLISH_LANGUAGE: string = 'en';
const FRENCH_LANGUAGE: string = 'fr';

const WEAPON_ROCK: number = 1;
const WEAPON_PAPER: number = 2;
const WEAPON_SCISSORS: number = 3;

describe('GameComponent', () => {

  let fixture: ComponentFixture<GameComponent>;
  let component: GameComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
      imports: [
        TranslateTestingModule
        .withTranslations({
          [ENGLISH_LANGUAGE]: require('assets/i18n/en.json'),
          [FRENCH_LANGUAGE]: require('assets/i18n/fr.json')
        })
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
    expect(headers.length).toBe(3);
    expect(headers[0].textContent?.trim()).toContain('Opponent');
    expect(headers[1].textContent?.trim()).toContain('Clear the scores');
    expect(headers[2].textContent?.trim()).toContain('Me');
  });

  it('should have picked an opponent weapon', async(() => {
    component.opponentPickRandomWeapon();
    fixture.whenStable().then(() => {
      expect(component.opponentWeapon).toBeGreaterThanOrEqual(1);
    })
  }));

  it('should have picked an opponent weapon once the player picked one', () => {
    component.playerPicksRock();
    expect(component.opponentWeapon).toBeGreaterThanOrEqual(1);
  });

  it('should have set the game result once the player picked one', () => {
    component.playerPicksRock();
    expect(component.gameResult).toBeDefined();
  });

  it('should result in a game tie', () => {
    expect(component.gameIsTie(component.getGameOutcome(WEAPON_ROCK, WEAPON_ROCK))).toBeTrue();
  });

  it('should result in a game win', () => {
    expect(component.gameIsWin(component.getGameOutcome(WEAPON_ROCK, WEAPON_SCISSORS))).toBeTrue();
    expect(component.gameIsWin(component.getGameOutcome(WEAPON_PAPER, WEAPON_ROCK))).toBeTrue();
  });

  it('should result in a game loss', () => {
    expect(component.gameIsLoss(component.getGameOutcome(WEAPON_ROCK, WEAPON_PAPER))).toBeTrue();
    expect(component.gameIsLoss(component.getGameOutcome(WEAPON_SCISSORS, WEAPON_ROCK))).toBeTrue();
  });
});