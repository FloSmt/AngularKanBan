// status.component.ts
import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  column1: Card[] = [];
  column2: Card[] = [];
  column3: Card[] = [];
  column4: Card[] = [];
  constructor(public cardService: CardService) {}

  ngOnInit() {
    // Initialize the statusList to the first column cards on component initialization
    this.statusList = this.cardService.getColumns()[0];
  }

  // Define a property to hold the statusList for the first column
  statusList: Card[] = [];

  /* addNewCardToColumn(columnIndex: number, title:string, content:string) {
    this.cardService.addCardsToColumn(columnIndex,title,content);

    //update the card arrays after adding new card
    const columns : Card[][] = this.cardService.getColumns();
    this.column1 = columns[0];
    this.column2 = columns[1];
    this.column3 = columns[2];
    this.column4 = columns[3];

    this.statusList = this.cardService.getColumns()[columnIndex-1]; // Update the list after adding cards
    const newCardIndex = this.statusList.length-1;

    this.statusList[newCardIndex].id = newCardIndex+1;
  } */
}
