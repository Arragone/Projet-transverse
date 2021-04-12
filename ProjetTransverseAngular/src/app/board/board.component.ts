import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: any[];
  nbr_cases: number;


  constructor() {
    this.squares = Array(0).fill(null);
    this.nbr_cases = 0;
  }

  ngOnInit(): void {
  }

  newGame(){
    this.squares = Array(30 * 20).fill('empty_square.png');
    for (let i = 0; i < 30; i++) {
      this.squares[i] = 'square.png'
      this.squares[19*30 + i] = 'square.png'
    }
    for (let i = 1; i < 20; i++) {
      this.squares[i * 30] = 'square.png'
      this.squares[i * 30 + 29] = 'square.png'
    }

    this.nbr_cases = 30 * 20;
  }

}
