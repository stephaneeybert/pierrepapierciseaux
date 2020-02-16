import { Injectable } from '@angular/core';

const OPPONENT_PLAYTIME: number = 500;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public getRandomWeapon(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

}
