import { Injectable } from '@angular/core';

import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {StatusService} from "./status.service";
import {Status} from "./status";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cards : Card[] = [];

  // Define properties to hold cards for each column
  column1: Card[] = [];
  column2: Card[] = [];
  column3: Card[] = [];
  column4: Card[] = [];

  updateColumns() {
    const cards = this.getCards();
    this.column1 = cards.filter((card) => card.status.id === 0);
    this.column2 = cards.filter((card) => card.status.id === 1);
    this.column3 = cards.filter((card) => card.status.id === 2);
    this.column4 = cards.filter((card) => card.status.id === 3);
  }

    addCard(title:string, description:string) {
      const newCard: Card = {id: this.getNextId(), title:title, description:description, priority:this.priorityService.getPriority(-1), status: this.statusService.getStatus(0)};
      this.cards.push(newCard);
    }

    private getNextId() :number {
      if (this.cards.length != 0) {
        return this.cards[this.cards.length-1].id+1;
      }else {
        return 1;
      }
    }

    getCards() : Card[] {
      return this.cards;
    }

  constructor(private priorityService:PriorityService, private statusService:StatusService) { }


  public setCard(card:Card):void {
    this.cards.find(x=>x.id == card.id)!.status = card.status;
    this.cards.find(x=>x.id == card.id)!.priority = card.priority;
    this.cards.find(x=>x.id == card.id)!.description = card.description;
    this.cards.find(x=>x.id == card.id)!.title = card.title;
  }

  public deleteCard(id:number) {
    if (!this.cards.find(x => x.id == id)) {
      return;
    }

    // @ts-ignore
    var card: Card = this.cards.find(x => x.id == id);
    var index: number = this.cards.indexOf(card);

    this.cards.splice(index, 1);
  }

  public getCardsWithStatus(status:Status):Card[] {
    let cards1:Card[] = [];

    // @ts-ignore
    for (const card:Card of this.cards) {
      if (card.status === status) {
        cards1.push(card);
      }
    }
    cards1.sort(function (a,b) {return (b.priority.id)-(a.priority.id)})
    return cards1;
  }

}

