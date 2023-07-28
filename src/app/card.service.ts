import { Injectable } from '@angular/core';
import { Card } from "./card";


@Injectable({
  providedIn: 'root'
})
export class CardService {
  private columns : Card[][] = [[], [], [],[]];


  addCardsToColumn(columnIndex: number, title:string, content:string) {
    this.columns[columnIndex - 1].push({id:1, title, content});
  }


  getColumns() : Card[][] {
    return this.columns;
  }
}

