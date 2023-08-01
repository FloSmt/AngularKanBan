
// grid-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Card } from "../card";
import { CardService } from '../card.service';
import {PriorityService} from "../priority.service";
import {StatusService} from "../status.service";

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


  constructor(public cardService: CardService, public statusService:StatusService) {

  }

  protected readonly CardService = CardService;
  protected readonly PriorityService = PriorityService;

  ngOnInit() {
    this.updateColumns();
  }

  // Method to add a new card to the specified column
  addNewCardToColumn(event: { title: string; content: string }) {
    const {title, content} = event;
    this.cardService.addCard(title, content);
    this.updateColumns();
  }

  updateColumns() {
    const cards = this.cardService.getCards();
    this.column1 = cards.filter((card) => card.status.id === 0);
    this.column2 = cards.filter((card) => card.status.id === 1);
    this.column3 = cards.filter((card) => card.status.id === 2);
    this.column4 = cards.filter((card) => card.status.id === 3);
  }
}
