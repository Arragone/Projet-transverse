import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  levelData : any;
  actualLevel: number;
  lenght: number;
  startGame: number;
  showHistory: number;
  gameHistory: any[];


  constructor(private httpClient: HttpClient) {
    this.actualLevel = 1;
    this.lenght = 0;
    this.startGame = 0;
    this.showHistory = 0;
    this.gameHistory = Array(0).fill(null);
  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:3000/allLevel", { responseType: 'text' }).subscribe(res => {this.levelData = JSON.parse(res);});
    this.httpClient.get("http://localhost:3000/allGames", { responseType: 'text' }).subscribe(res => {this.gameHistory = JSON.parse(res);});

  }

  startGameOnMenu(){
    this.startGame = 1;
  }

  showHistoryButton(){
    if(this.showHistory == 0){
      this.showHistory = 1;
    }else {
      this.showHistory = 0;
    }
  }

  nextLevelStyle(event :any){
    this.actualLevel = event;
  }
}
