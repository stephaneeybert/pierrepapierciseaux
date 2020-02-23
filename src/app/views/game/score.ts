import { Subscription } from 'rxjs';

export class Score {

  player: number;
  opponent: number;

  constructor(player: number, opponent: number) {
    this.player = player;
    this.opponent = opponent;
  }

}
