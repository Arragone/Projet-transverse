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


  constructor(private httpClient: HttpClient) {
    this.actualLevel = 1;
    this.lenght = 0;
    this.startGame = 0;
  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:3000/allLevel", { responseType: 'text' }).subscribe(res => {this.levelData = JSON.parse(res);});
  }

  startGameOnMenu(){
    this.startGame = 1;
  }


  nextLevelStyle(event :any){
    this.actualLevel = event;
  }
}
