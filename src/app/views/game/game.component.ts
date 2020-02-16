import { Component, OnDestroy } from '@angular/core';
import { GameService } from '@app/core/service/game.service';
import { Subscription, timer, Observable } from 'rxjs';

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
  gameResult: string = '';

  waitingForOpponentToPlay: boolean = false;

  private opponentPlaySubscription?: Subscription;

  constructor(
    private gameService: GameService
  ) { }

  public ngOnDestroy() {
    if (this.opponentPlaySubscription != null) {
      this.opponentPlaySubscription.unsubscribe();
    }
  }

  public playerPickWeapon(weapon: number): void {
    if (this.waitingForOpponentToPlay) {
      return;
    }

    this.resetGame();
    this.playerWeapon = weapon;

    this.waitingForOpponentToPlay = true;
    this.opponentPickWeapon().subscribe(() => {
      this.waitingForOpponentToPlay = false;
      this.decideResult();
    });
  }

  public opponentPickWeapon(): Observable<number> {
    this.opponentWeapon = this.gameService.getRandomWeapon();
    return timer(OPPONENT_PLAYTIME);
  }

  private decideResult(): void {
    if (this.playerWeapon == this.opponentWeapon) {
      // The play is a tie
      this.gameResult = RESULT_TIE;
    } else if ((this.playerWeapon - this.opponentWeapon + 3) % 3 == 1) {
      // The player wins
      this.gameResult = RESULT_WIN;
      this.playerScore = this.playerScore + 1;
    } else {
      // The player looses to the opponent
      this.gameResult = RESULT_LOST;
      this.opponentScore = this.opponentScore + 1;
    }
  }

  private resetGame() {
    this.playerWeapon = 0;
    this.opponentWeapon = 0;
  }

}
