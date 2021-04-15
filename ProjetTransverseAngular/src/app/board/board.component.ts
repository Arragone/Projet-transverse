import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: any[];
  nbrCases: number;
  levelData : any ;
  actualLevel: number;


  constructor(private httpClient: HttpClient){
    this.squares = Array(0).fill(null);
    this.nbrCases = 0;
    this.actualLevel = 1;
  }

  ngOnInit(): void {
    this.newGame()
  }

  getGame(){
    this.httpClient.get("http://localhost:3000/allLevel", { responseType: 'text' }).subscribe(res => {this.levelData = JSON.parse(res);console.log(res);});

    //console.log(this.levelData["Lenght"]);
  }

  newGame(){
    this.getGame()

    //console.log(this.levelData["Lenght"]);

    this.squares = Array(30 * 20).fill('empty_square.png');
    for (let i = 0; i < 30; i++) {
      this.squares[i] = 'square.png'
      this.squares[19*30 + i] = 'square.png'
    }
    for (let i = 1; i < 20; i++) {
      this.squares[i * 30] = 'square.png'
      this.squares[i * 30 + 29] = 'square.png'
    }

    this.nbrCases = 30 * 20;
  }

  nextLevel(){
    for (let i = 1; i < 19; i++) {
      this.squares[5+i*30] = 'square.png'
      this.squares[7+i*30] = 'empty_square.png'
    }
  }

  lastLevel(){
    for (let i = 1; i < 19; i++) {
      this.squares[7+i*30] = 'square.png'
      this.squares[5+i*30] = 'empty_square.png'
    }
  }

}
