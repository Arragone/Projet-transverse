import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Output()
  nextLevelInStyle : EventEmitter<number> = new EventEmitter<number>();

  squaresTab: any[];
  nbrCases: number;
  levelData : any;
  actualLevel: number;
  newLevel: string;


  constructor(private httpClient: HttpClient){
    this.squaresTab = Array(0).fill(null);
    this.nbrCases = 0;
    this.actualLevel = 1;
    this.newLevel = " ";
  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:3000/allLevel", { responseType: 'text' }).subscribe(res => {this.levelData = JSON.parse(res);});
  }

  newGame(){
    this.refreshLevel();
  }




  refreshLevel(){
    this.nextLevelInStyle.emit(this.actualLevel); //Actualise the size of the grid

    this.squaresTab = Array(this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width);


    this.newLevel = this.levelData[this.actualLevel-1].Container;                                           //Create the wall
    this.nbrCases = this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width;
    for(let i = 0; i < this.nbrCases; i++){
      if(this.newLevel[i] == '0'){
        this.squaresTab[i] = 'empty_square.png'
      }
      if(this.newLevel[i] == '1'){
        this.squaresTab[i] = 'square.png'
      }
    }



    this.squaresTab[this.levelData[this.actualLevel-1].Start1] = 'player1.png';

    this.squaresTab[this.levelData[this.actualLevel-1].Start2] = 'player2.png';


  }



  nextLevel(){
    this.actualLevel += 1;
    this.refreshLevel();

  }

  lastLevel(){
    this.actualLevel -= 1;
    this.refreshLevel();
  }
}
