import { Injectable } from '@angular/core';
import {Card} from "./card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards:Card[] = [];

  constructor() { }

  addCard(card:Card) {
    this.cards.push(card);
  }
}
