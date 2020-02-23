import { Injectable } from '@angular/core';
import { Score } from '@app/views/game/score';
import { ScoreStore } from '../store/score-store';

const OPPONENT_PLAYTIME: number = 500;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private scoreStore: ScoreStore
  ) { }

  public getRandomWeapon(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  public addScore(player: number, opponent: number): void {
    const score: Score = new Score(player, opponent);
    this.scoreStore.addScore(score);
  }

  public clearScores(): void {
    this.scoreStore.clearScores();
  }
}
