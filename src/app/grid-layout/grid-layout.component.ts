// grid-layout.component.ts
import {Component, OnInit} from '@angular/core';
import {Card} from "../card";
import {CardService} from '../card.service';
import {PriorityService} from "../priority.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css'],
})

export class GridLayoutComponent implements OnInit {
  // Define properties to hold cards for each column
  column1: Card[] = [];
  column2: Card[] = [];
  column3: Card[] = [];
  column4: Card[] = [];


  constructor(public cardService: CardService) {}

  protected readonly CardService = CardService;
  protected readonly PriorityService = PriorityService;

  ngOnInit() {
    this.updateColumns();
  }

  // Method to add a new card to the specified column
  addNewCardToColumn(event: { columnIndex: number; title: string; content: string }) {
    const {title, content, columnIndex} = event;
    this.cardService.addCard(title, content, columnIndex);
    this.updateColumns();
  }

  private updateColumns() {
    const cards = this.cardService.getCards();
    this.column1 = cards.filter((card) => card.columnIndex === 1);
    this.column2 = cards.filter((card) => card.columnIndex === 2);
    this.column3 = cards.filter((card) => card.columnIndex === 3);
    this.column4 = cards.filter((card) => card.columnIndex === 4);
  }

  onCardDrop(event: CdkDragDrop<Card[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data,event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const card = event.item.data;
      const newColumnIndexAttr = event.container.element.nativeElement.getAttribute('data-column-index');
      const newColumnIndex = newColumnIndexAttr !== null ? newColumnIndexAttr:1;

      if(card) {
        card.columnIndex = newColumnIndex;
        this.updateColumns();
      }
    }
  }
}
