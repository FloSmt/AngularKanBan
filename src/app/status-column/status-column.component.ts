import {Component, Input} from '@angular/core';
import {CardService} from "../card.service";
import {StatusService} from "../status.service";
import {Status} from "../status";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Card} from "../card";


@Component({
  selector: 'app-status-column',
  templateUrl: './status-column.component.html',
  styleUrls: ['./status-column.component.css']
})
export class StatusColumnComponent {

  @Input() status!:Status;

  constructor(public cardService:CardService, public statusService:StatusService) {
  }

  getColor(status:Status):string {
    if (this.cardService.getCardsWithStatus(status).length > status.max) {
      return "#f83000";
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
    card.status = this.statusService.getStatus(columnIndex);
  }


  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const cardToMove = event.previousContainer.data[event.previousIndex];
      const targetColumnIndex = +event.container.id.split('-')[1];
      this.setCardStatusBasedOnColumn(cardToMove,targetColumnIndex);
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
    this.setCardStatusBasedOnColumn(this.cardService.getCards()[this.cardService.getCards().length-1],targetColumnIndex);
    //console.log(targetColumnIndex);
  }
}
