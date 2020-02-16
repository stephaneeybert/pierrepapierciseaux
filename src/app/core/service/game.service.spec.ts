import { TestBed, getTestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GameService } from './game.service';

describe('GameService', () => {

  let injector: TestBed;
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('', {enabled: false})
      ],
      providers: [
        ServiceWorkerModule,
        GameService
      ],
    });

    injector = getTestBed();
    gameService = injector.get(GameService);
  });

  it('getRandomWeapon() should return a random number between 1 and 3', () => {
    expect(gameService.getRandomWeapon()).toBeGreaterThanOrEqual(1);
    expect(gameService.getRandomWeapon()).toBeLessThanOrEqual(3);
  });

});