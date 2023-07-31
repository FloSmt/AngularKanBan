import { Injectable } from '@angular/core';

import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {Priority} from "./priority";
import {StatusService} from "./status.service";
import {Status} from "./status";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cards : Card[] = [{
    id:0,
    title:"test",
    description:"",
    priority: this.priorityService.getPriority(-1),
    status: this.statusService.getStatus(0)
  }];

    addCard(title:string, description:string, status:Status) {
      const newCard: Card = {id: this.getNextId(), title:title, description:description, priority:this.priorityService.getPriority(-1), status: this.statusService.getStatus(0)};
      this.cards.push(newCard);
    }

    private getNextId() :number {
      return this.cards.length+1
    }

    getCards() : Card[] {
      return this.cards;
    }

  constructor(private priorityService:PriorityService, private statusService:StatusService) { }


  public setCard(card:Card):void {
    this.cards.find(x=>x.id == card.id)!.priority = card.priority;
    this.cards.find(x=>x.id == card.id)!.description = card.description;
    this.cards.find(x=>x.id == card.id)!.title = card.title;

  }

}

