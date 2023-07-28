import { Injectable } from '@angular/core';
import {Card} from "./card";
import {PriorityService} from "./priority.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public static cards:Card[] = [
    {
      id: 139,
      priority: new PriorityService().getPriority(0),
      title: "Das ist eine test-Card"
    }
  ];

  constructor() { }

  public static addCard(card:Card) {
    this.cards.push(card);
  }

  public static getCards() {
    return this.cards;
  }
}
