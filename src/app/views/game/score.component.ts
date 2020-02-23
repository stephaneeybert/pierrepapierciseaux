import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Score } from './score';
import { ScoreStore } from '@app/core/store/score-store';

@Component({
  selector: 'scores',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {

  scores$: Observable<Array<Score>> = of([]);

  constructor(
    private scoreStore: ScoreStore
  ) { }

  public ngOnInit(): void {
    this.scores$ = this.scoreStore.state$;
  }

  public clearScores(): void {
    this.scoreStore.clearScores();
  }

}
