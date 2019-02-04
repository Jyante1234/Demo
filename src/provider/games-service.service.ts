import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GamesServiceService {

  gamesMockData = 'assets/mockData/mockDataGames.json';
  constructor(private http: HttpClient) { }
  public getGamesMockData() {
    return this.http.get(this.gamesMockData);
  }
  openGame() {
    return window;
  }
}
