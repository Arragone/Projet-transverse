import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  x = false;
  y = 0;

  constructor(private httpClient: HttpClient){ }



  ngOnInit(): void {
  }

  test() {
    this.httpClient.get("http://localhost:3000/", { responseType: 'text' }).subscribe(res => {console.log(res);})
    this.y++;
  }


}
