import { Component, OnInit } from '@angular/core';
import { GamesServiceService } from '../../../provider/games-service.service';
import { Router } from '@angular/router';
import { PopupService } from 'src/provider/popup.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  showPopup = false;
  gamesMockData: any = [];
  nativeWindow: any;

  constructor(public popupService: PopupService,private gamesServiceService: GamesServiceService, private router: Router) {
    this.nativeWindow = gamesServiceService.openGame();
  }

  getGamesMockData() {
    return this.gamesServiceService.getGamesMockData().subscribe(res => {
      this.gamesMockData = res['gamesMockData'];
    },
      err => console.log(err),
      () => console.log());
  }
  openPopup(type: string) {
    this.popupService.setPopupState(true);
    this.popupService.setPopupType(type);
  }
  openGame(gameType, gameID) {
    this.popupService.setGameType(gameType);
    console.log('in comp', gameType);
    this.popupService.setGameUrl(gameID.gameUrl);
  }
  // openReport(reportType, id) {
  //   this.popupService.setReportType(reportType);
  //   console.log('in class:', reportType);
  //   this.popupService.setPopupDescription(id);
  // }

  ngOnInit() {
    this.getGamesMockData();
  }

}
