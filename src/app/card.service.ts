import { Injectable } from '@angular/core';

import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {Priority} from "./priority";

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

  constructor() { }

  public getCards() {
    return this.cards;
  }

  public setCard(card:Card):void {
    this.cards.find(x=>x.id == card.id)!.priority = card.priority;
    this.cards.find(x=>x.id == card.id)!.description = card.description;
    this.cards.find(x=>x.id == card.id)!.title = card.title;

  }

}

