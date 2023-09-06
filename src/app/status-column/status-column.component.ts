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
  @Input() status! : Status;

  constructor(public cardService:CardService, public statusService:StatusService, private dbService: DataService) {
    this.cardService.updateColumns();
  }

  //Wenn Max Cards in Column überschritten --> Farbe Rot
  getColor(status:Status):string {
    if (status.limit) {
      if (this.cardService.getCardsOfStatus(status).length > status.max) {
        return "#f83000";
      }
    }

    return "#9f9f9f";
  }

  //öffnet das Edit Menü, bei Klick auf Karte
  openEdit() {
    const statusedit = document.getElementById(this.status.id.toString());
    if (statusedit) {
      statusedit.style.display = 'flex';
    }
  }

  private setCardStatusBasedOnColumn(card:Card, columnIndex:number) {
    this.cardService.setStatus(card, this.statusService.getStatus(columnIndex));
  }

  //Wird beim verschieben einer Card ausgeführt
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer !== event.container)  {
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

      this.cardService.updateColumns();

    }
  }

  //Fügt eine neue Card über das Input Feld hinzu
  addNewCardToColumn(event: { id: string; title: string; content: string }) {
    const targetColumnIndex: number = parseInt(event.id.split('-')[1]);
    this.cardService.addCard(event.title,event.content);
    this.setCardStatusBasedOnColumn(this.cardService.getCards()[this.cardService.getCards().length-1],targetColumnIndex);

    //neue card wird in db eingefügt
    this.insertDataInDb(targetColumnIndex,event.title, -1);
  }

  private updateStatusInDb(cardId:number, newStatusId:number) {
    this.dbService.updateCardInDb(cardId, null, newStatusId, null, null, new Date(Date.now())).subscribe(
        response => {
          console.log('Status ID successfully updated in database');
        }, error => {
          console.error('Error updating status ID: ', error);
        }
    )
  }

  private insertDataInDb(newStatusId: number, title: string, priorityId: number): void {
    this.dbService.insertNewCard(newStatusId, title, priorityId)
      .subscribe(
        response => {
          console.log('Daten erfolgreich eingefügt', response);
        },
        error => {
          console.error('Fehler beim Einfügen der Daten', error);
        }
      );
  }
}
