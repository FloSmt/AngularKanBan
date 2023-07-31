import { Injectable } from '@angular/core';
import { Card } from "./card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private columns : Card[][] = [[], [], [],[]];

  addCardsToColumn(columnIndex: number, title:string, content:string) {
    if(columnIndex >= 1 && columnIndex <= 4){
      const newCard: Card = {id: this.getNextId(columnIndex), title:title, content:content};
      this.columns[columnIndex-1].push(newCard);
    }
  }

  private getNextId(columnIndex:number): number {
    let maxId = 0;
    const column = this.columns[columnIndex -1];
    this.columns.forEach((card) => {
      column.forEach((card) => {
        if (card.id > maxId) {
          maxId = card.id;
        }
      });
    });
    return maxId + 1;
  }


  getColumns() : Card[][] {
    return this.columns;
  }
}

