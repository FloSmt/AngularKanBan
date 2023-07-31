import { Injectable } from '@angular/core';
import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {Priority} from "./priority";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public cards:Card[] = [
    {
      id: 139,
      priority: this.priorityService.getPriority(3),
      title: "Das ist eine test-Card mit sehr langem Titel und extem vielen Buchstaben",
      description: " gdfgdfdd fgfd g dfgdfgdgddf dgdg dg dgdg gdfgd dfgfd ggd gdg gdgdfgdgdfg dgfdg dg sdf fsfsffsf sdf sds  ffsf sdsfsfdffd   d dfdfsf sfsdf sf fd df f"
    },
    {
      id: 140,
      priority: this.priorityService.getPriority(1),
      title: "Titel",
      description: "beschreibung"
    }
  ];

  constructor(private priorityService:PriorityService) { }

  public addCard(card:Card) {
    this.cards.push(card);
  }

  public getCards() {
    return this.cards;
  }

  public setCard(card:Card):void {
    this.cards.find(x=>x.id == card.id)!.priority = card.priority;
    this.cards.find(x=>x.id == card.id)!.description = card.description;
    this.cards.find(x=>x.id == card.id)!.title = card.title;

  }
}
