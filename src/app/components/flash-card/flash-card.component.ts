import { Component, OnInit, Input } from '@angular/core';
import { GamesServiceService } from '../../../provider/games-service.service';
@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent implements OnInit {
  gamesMockData: any = [];
  showPopup = false;
  gameID: any;
  gameTitle: any;
  @Input()
  games: any;
  constructor(private gamesServiceService: GamesServiceService) { }
  getGamesMockData() {
     return this.gamesServiceService.getGamesMockData().subscribe(res => {
      this.gamesMockData = res['gamesMockData'];
    });
  }
  openGame(game: any) {
    this.gameID = game.gameId;
    this.gameTitle = game.gameTitle;
    this.showPopup = !this.showPopup;
  }
  ngOnInit() {
    this.getGamesMockData();
  }
}
