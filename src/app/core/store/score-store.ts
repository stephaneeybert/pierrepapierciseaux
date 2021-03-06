import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from './store';
import { Score } from '@app/views/game/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreStore extends Store<Array<Score>> {

  constructor() {
    super(new Array<Score>());
  }

  public getScores(): Observable<Array<Score>> {
    return this.state$;
  }

  public addScore(score: Score): void {
    const devices = this.getState();
    devices.push(score);
    this.setState(devices);
  }

  public getNumberOfScores(): number {
    return this.getState().length;
  }

  public clearScores(): void {
    this.setState([]);
  }
}
