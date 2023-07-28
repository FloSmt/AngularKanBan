// grid-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  // Define properties to hold cards for each column
  column1: Card[] = [];
  column2: Card[] = [];
  column3: Card[] = [];
  column4: Card[] = [];

  constructor(public cardService: CardService) {
    // Assign the cards for each column from the CardService
    const columns = this.cardService.getColumns();
    this.column1 = columns[0];
    this.column2 = columns[1];
    this.column3 = columns[2];
    this.column4 = columns[3];
  }

  ngOnInit() {
    // Optional: Perform any initialization logic here if needed
  }

}
