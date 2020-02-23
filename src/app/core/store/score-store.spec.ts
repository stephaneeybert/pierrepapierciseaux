import { async, TestBed } from '@angular/core/testing';
import { ScoreStore } from "./score-store";
import { Score } from '@app/views/game/score';
import { doesNotReject } from 'assert';

describe('ScoreStore', () => {

  let scoreStore: ScoreStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreStore]
    });

    scoreStore = new ScoreStore();
    scoreStore.setState([]);
  });

  it('should correctly add a score', (done: DoneFn) => {
    const playerScore: number = 1;
    const opponentScore: number = 1;
    const score: Score = new Score(playerScore, opponentScore);
    scoreStore.addScore(score);
    scoreStore.getScores().subscribe((scores: Array<Score>) => {
        expect(scores[0].player).toBe(playerScore);
        expect(scores[0].opponent).toBe(opponentScore);
      done();
    });
  });
});