import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Score } from './score';
import { ScoreStore } from '@app/core/store/score-store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

}
