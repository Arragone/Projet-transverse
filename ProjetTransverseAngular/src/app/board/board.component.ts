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

  squares: any[];
  nbrCases: number;
  levelData : any;
  actualLevel: number;
  newLevel: string;


  constructor(private httpClient: HttpClient){
    this.squares = Array(0).fill(null);
    this.nbrCases = 0;
    this.actualLevel = 1;
    this.newLevel = " ";
  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:3000/allLevel", { responseType: 'text' }).subscribe(res => {this.levelData = JSON.parse(res);});
  }

  newGame(){

    this.refreshLevel();
    /*
    for (let i = 0; i < this.levelData[this.actualLevel-1].Lenght; i++) {
      this.squares[i] = 'square.png'
      this.squares[(this.levelData[this.actualLevel-1].Width - 1 ) * this.levelData[this.actualLevel-1].Lenght + i] = 'square.png'
    }
    for (let i = 1; i < this.levelData[this.actualLevel-1].Width; i++) {
      this.squares[i * this.levelData[this.actualLevel-1].Lenght] = 'square.png'
      this.squares[i * this.levelData[this.actualLevel-1].Lenght + this.levelData[this.actualLevel-1].Lenght - 1] = 'square.png'
    }*/

  }

  refreshLevel(){
    this.squares = Array(this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width).fill('empty_square.png');

    this.newLevel = this.levelData[this.actualLevel-1].Container;

    this.nbrCases = this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width;
    for(let i = 0; i < this.nbrCases; i++){
      if(this.newLevel[i] == '0'){
        this.squares[i] = 'empty_square.png'
      }
      if(this.newLevel[i] == '1'){
        this.squares[i] = 'square.png'
      }
    }
  }

  //@Output() nextLevelInStyle = new EventEmitter<string>();

  nextLevel(){
    //this.nextLevelInStyle.emit("this.actualLevel+1");
    this.actualLevel += 1;
    this.refreshLevel();

  }

  lastLevel(){
    this.actualLevel -= 1;
    this.refreshLevel();
  }

}
