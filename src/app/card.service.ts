import { Injectable } from '@angular/core';
import { Card } from "./card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private columns : Card[][] = [[], [], [],[]];
  private idCounter: number = 1;

  addCardsToColumn(columnIndex: number, title:string, content:string) {
    if(columnIndex >= 1 && columnIndex <= 4){
      const newCard: Card = {id: this.getNextId(), title:title, content:content};
      this.columns[columnIndex-1].push(newCard);
    }
  }

  private getNextId(): number {
    return this.idCounter++;
  }


  getColumns() : Card[][] {
    return this.columns;
  }
}

