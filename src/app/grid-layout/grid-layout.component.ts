import {Component, OnInit} from '@angular/core';
import {CardService} from '../card.service';
import {PriorityService} from "../priority.service";
import {StatusService} from "../status.service";
import {Card} from "../card";

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})

export class GridLayoutComponent implements OnInit {


  constructor(public cardService: CardService, public statusService:StatusService) {

  }

  protected readonly CardService = CardService;
  protected readonly PriorityService = PriorityService;

  ngOnInit() {
    this.cardService.updateColumns();
  }

  // Method to add a new card to the specified column
  addNewCardToColumn(event: { title: string; content: string }) {
    const {title, content} = event;
    this.cardService.addCard(title, content);
    this.cardService.updateColumns();
  }

}
