import { Component, OnDestroy } from '@angular/core';
import { GameService } from '@app/core/service/game.service';
import { Subscription, timer } from 'rxjs';

const RESULT_WIN = 'WIN';
const RESULT_LOST = 'LOST';
const RESULT_TIE = 'TIE';
const OPPONENT_PLAYTIME: number = 500;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [ GameService ]
})
export class GameComponent implements OnDestroy {

  playerWeapon: number = 0;
  opponentWeapon: number = 0;
  playerScore: number = 0
  opponentScore: number = 0;
  playerResult: string = '';

  waitingForOpponentToPlay: boolean = false;

  private opponentPlaySubscription?: Subscription;

  constructor(
    private gameService: GameService
  ) { }

  ngOnDestroy() {
    if (this.opponentPlaySubscription != null) {
      this.opponentPlaySubscription.unsubscribe();
    }
  }

  playerPickWeapon(weapon: number): void {
    if (this.waitingForOpponentToPlay) {
      return;
    }

    this.resetGame();
    this.waitingForOpponentToPlay = true;
    this.playerWeapon = weapon;

    timer(OPPONENT_PLAYTIME).subscribe(() => {
      this.opponentPickWeapon();

      this.checkResult();
    });
  }

  private opponentPickWeapon(): void {
    this.opponentWeapon = this.gameService.getRandomWeapon();
    this.waitingForOpponentToPlay = false;
  }

  private checkResult(): void {
    if (this.playerWeapon == this.opponentWeapon) {
      // The play is a tie
      this.playerResult = RESULT_TIE;
    } else if ((this.playerWeapon - this.opponentWeapon + 3) % 3 == 1) {
      // The player wins
      this.playerResult = RESULT_WIN;
      this.playerScore = this.playerScore + 1;
    } else {
      // The player looses to the opponent
      this.playerResult = RESULT_LOST;
      this.opponentScore = this.opponentScore + 1;
    }
  }

  private resetGame() {
    this.playerWeapon = 0;
    this.opponentWeapon = 0;
  }

}
