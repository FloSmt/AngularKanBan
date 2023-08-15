import {Component, Input} from '@angular/core';
import {CardService} from "../card.service";
import {StatusService} from "../status.service";
import {Status} from "../status";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Card} from "../card";
import {DataService} from "../db.service";


@Component({
  selector: 'app-status-column',
  templateUrl: './status-column.component.html',
  styleUrls: ['./status-column.component.css']
})
export class StatusColumnComponent {
  cards: Card[] = [];
  @Input() status! : Status;

  constructor(public cardService:CardService, public statusService:StatusService, private dbService: DataService) {
    cardService.getCards$().subscribe(cards => {
      this.cards = this.cardService.getCardsWithStatus(this.status);
    })
  }

  getColor(status:Status):string {
    if (status.limit) {
      if (this.cardService.getCardsWithStatus(status).length > status.max) {
        return "#f83000";
      }else {
        return "#9f9f9f";
      }
    }else {
      return "#9f9f9f";
    }
  }

  openEdit() {
    const statusedit = document.getElementById(this.status.id.toString());
    if (statusedit) {
      statusedit.style.display = 'flex';
    }
  }

  setCardStatusBasedOnColumn(card:Card, columnIndex:number) {
    this.cardService.setStatus(card, this.statusService.getStatus(columnIndex));
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const cardToMove = event.previousContainer.data[event.previousIndex];
      const targetColumnIndex = +event.container.id.split('-')[1];
      this.setCardStatusBasedOnColumn(cardToMove,targetColumnIndex);

      this.updateStatusInDb(cardToMove.id, targetColumnIndex);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addNewCardToColumn(event: { id: string; title: string; content: string }) {
    const targetColumnIndex: number = parseInt(event.id.split('-')[1]);
    this.cardService.addCard(event.title,event.content);
    this.cards = this.cardService.getCardsWithStatus(this.status);
    this.setCardStatusBasedOnColumn(this.cardService.getCards()[this.cardService.getCards().length-1],targetColumnIndex);
  }

  private updateStatusInDb(cardId:number, newStatusId:number) {
    this.dbService.updateCardStatusInDb(cardId, newStatusId).subscribe(
        response => {
          console.log('Status ID successfully updated in database');
        }, error => {
          console.error('Error updating statuts ID: ', error);
        }
    )
  }
}
