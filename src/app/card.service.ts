import { Injectable } from '@angular/core';

import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {StatusService} from "./status.service";
import {Status} from "./status";
import {Priority} from "./priority";
import {DataService} from "./db.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards$$ = new BehaviorSubject<Card[]>([]);
  private cards : Card[] = [];

    addCard(title:string, description:string) {
      const date:Date = new Date(Date.now());
      // @ts-ignore
      const newCard: Card = {id: this.getNextId(), title:title, description:description, priority:this.priorityService.getPriority(-1), status: this.statusService.getStatus(0), created: date, edited: null};
      this.pushCard(newCard);
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

    getCards$(): Observable<Card[]> {
      return this.cards$$.asObservable();
    }

  constructor(public priorityService:PriorityService, private statusService:StatusService, private dataService : DataService) {

  }

  public setStatus(card:Card, status:Status) {
    if (!(this.cards.find(x=>x.id == card.id))) {
      return;
    }
    this.cards.find(x=>x.id == card.id)!.edited = new Date(Date.now());
    this.cards.find(x=>x.id == card.id)!.status = status;
  }

  //Card wird mit neuen Werten ersetzt
  public setCard(card:Card):void {
      if (!(this.cards.find(x=>x.id == card.id))) {
        return;
      }

    this.cards.find(x=>x.id == card.id)!.status = card.status;
    this.cards.find(x=>x.id == card.id)!.priority = card.priority;
    this.cards.find(x=>x.id == card.id)!.description = card.description;
    this.cards.find(x=>x.id == card.id)!.title = card.title;
    this.cards.find(x=>x.id == card.id)!.created = card.created;
    this.cards.find(x=>x.id == card.id)!.edited = new Date(Date.now());
  }

  public deleteCard(id:number) {
    if (!this.cards.find(x => x.id == id)) {
      return;
    }

    // @ts-ignore
    var card: Card = this.cards.find(x => x.id == id);
    var index: number = this.cards.indexOf(card);

    this.cards.splice(index, 1);
    this.cards$$.next(this.cards);
  }

  public getCardsWithStatus(status: Status):Card[] {
    let cards1:Card[] = [];
    // @ts-ignore
      for (const card:Card of this.cards) {
      if (card.status === status) {
        cards1.push(card);
      }
    }

    let p:Priority[] = this.priorityService.getPriorities();
    let service:PriorityService = this.priorityService;
    cards1.sort(function (a,b) {
      if (b.priority === service.getPriority(-1)) {
        return -9999;
      }
      if (a.priority === service.getPriority(-1)) {
        return 9999;
      }

      return (p.indexOf(a.priority))-(p.indexOf(b.priority))
    })
    return cards1;
  }

    public loadCardsFromDatabase(): boolean {
        this.dataService.getData().subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            const newCard: Card = {id: data[i].id, title: data[i].title, description: data[i].description, priority: this.priorityService.getPriorities()[data[i].priority], status: this.statusService.getStatusList()[data[i].status], created: data[i].created, edited: data[i].edited};
            this.pushCard(newCard);
          }
          return true;
        });
        return false;
    }

    public pushCard(card: Card): void {
      this.cards.push(card);
      this.cards$$.next(this.cards);
    }
}
