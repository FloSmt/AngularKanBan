import { Injectable } from '@angular/core';
import { Card } from "./card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards : Card[] = [];
    addCard(title:string, content:string, columnIndex:number) {
      const newCard: Card = {id: this.getNextId(), title:title, content:content,columnIndex:columnIndex};
      this.cards.push(newCard);
    }

    private getNextId() :number {
      return this.cards.length+1
    }

    getCards() : Card[] {
      return this.cards;
    }


}

