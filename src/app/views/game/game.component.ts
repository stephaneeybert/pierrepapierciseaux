import { Component } from '@angular/core';
import { GameService } from '@app/core/service/game.service';
import { timer, Observable } from 'rxjs';

const WEAPON_ROCK: number = 1;
const WEAPON_PAPER: number = 2;
const WEAPON_SCISSORS: number = 3;

const GAME_WIN = 'WIN';
const GAME_LOSS = 'LOSS';
const GAME_TIE = 'TIE';
const OPPONENT_PLAYTIME: number = 500;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [ GameService ]
})
export class GameComponent {

  playerWeapon: number = 0;
  opponentWeapon: number = 0;
  playerScore: number = 0
  opponentScore: number = 0;
  gameResult: string = '';

  waitingForOpponentToPlay: boolean = false;

  constructor(
    private gameService: GameService
  ) { }

  public playerPicksRock(): void {
    this.playerPicksWeapon(WEAPON_ROCK);
  }

  public playerPicksPaper(): void {
    this.playerPicksWeapon(WEAPON_PAPER);
  }

  public playerPicksScissors(): void {
    this.playerPicksWeapon(WEAPON_SCISSORS);
  }

  private playerPicksWeapon(weapon: number): void {
    if (this.waitingForOpponentToPlay) {
      return;
    }

    this.resetGame();
    this.playerWeapon = weapon;

    this.waitingForOpponentToPlay = true;
    this.opponentPickRandomWeapon().subscribe(() => {
      this.waitingForOpponentToPlay = false;
      this.gameResult = this.getGameOutcome(this.playerWeapon, this.opponentWeapon);
      this.updateScores(this.gameResult);
    });
  }

  public opponentPickRandomWeapon(): Observable<number> {
    this.opponentPickWeapon(this.gameService.getRandomWeapon());
    return timer(OPPONENT_PLAYTIME);
  }

  public opponentPickWeapon(weapon: number): void {
    this.opponentWeapon = weapon;
  }

  public getGameOutcome(playerWeapon: number, opponentWeapon: number): string {
    if (playerWeapon == opponentWeapon) {
      // The play is a tie
      return GAME_TIE;
    } else if ((playerWeapon - opponentWeapon + 3) % 3 == 1) {
      // The player wins
      return GAME_WIN;
    } else {
      // The player looses to the opponent
      return GAME_LOSS;
    }
  }

  public weaponIsRock(weapon: number): boolean {
    return WEAPON_ROCK == weapon;
  }

  public weaponIsPaper(weapon: number): boolean {
    return WEAPON_PAPER == weapon;
  }

  public weaponIsScissors(weapon: number): boolean {
    return WEAPON_SCISSORS == weapon;
  }

  public gameIsTie(gameResult: string): boolean {
    return GAME_TIE == gameResult;
  }

  public gameIsWin(gameResult: string): boolean {
    return GAME_WIN == gameResult;
  }

  public gameIsLoss(gameResult: string): boolean {
    return GAME_LOSS == gameResult;
  }

  private updateScores(gameResult: string): void {
    if (this.gameIsWin(gameResult)) {
      this.playerScore = this.playerScore + 1;
    } else if (this.gameIsLoss(gameResult)) {
      this.opponentScore = this.opponentScore + 1;
    }
    this.gameService.addScore(this.playerScore, this.opponentScore);
  }

  private resetGame(): void {
    this.playerWeapon = 0;
    this.opponentWeapon = 0;
  }

}
