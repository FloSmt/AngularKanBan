import { Injectable } from '@angular/core';
import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {StatusService} from "./status.service";
import {Status} from "./status";
import {Priority} from "./priority";
import {DataService} from "./db.service";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards$$ = new BehaviorSubject<Card[]>([]);
  private allCards : Card[] = [];
  private columnCards:any  = [];

  public isCardsLoading:boolean = true;

  constructor(public priorityService:PriorityService, private statusService:StatusService, private dataService : DataService) {
  }

  //Sortiert die column Cards neu
  updateColumns() {
    console.log("XXX update");
    this.getCards$().subscribe(cards => {
      this.columnCards = [];
      console.log("XXX",this.statusService.getStatusList());
      for (const status of this.statusService.getStatusList()) {
          this.columnCards.push(this.getCardsWithStatus(status));
      }
    })
  }


    //Fügt eine neu Card zur liste aller Cards hinzu
    addCard(title:string, description:string) {
      const date:Date = new Date(Date.now());
      // @ts-ignore
      const newCard: Card = {id: this.getNextId(), title:title, description:description, priority:this.priorityService.getPriority(-1), status: null, created: date, edited: null};
      this.pushCard(newCard);

      this.updateColumns();
    }

    //gibt die nächst möglich zu vergebende ID einer Card zurück
    private getNextId() :number {
      if (this.allCards.length != 0) {
        return this.allCards[this.allCards.length-1].id+1;
      }else {
        return 1;
      }
    }

    //gibt alle Cards zurück
    getCards() : Card[] {
      return this.allCards;
    }

    getCards$(): Observable<Card[]> {
      return this.cards$$.asObservable();
    }

  public setStatus(card:Card, status:Status) {
    if (!(this.allCards.find(x=>x.id == card.id))) {
      return;
    }
    this.allCards.find(x=>x.id == card.id)!.edited = new Date(Date.now());
    this.allCards.find(x=>x.id == card.id)!.status = status;

    this.updateColumns();
  }

  //Card wird mit neuen Werten ersetzt
  public setCard(card:Card):void {
      if (!(this.allCards.find(x=>x.id == card.id))) {
        return;
      }

    this.allCards.find(x=>x.id == card.id)!.status = card.status;
    this.allCards.find(x=>x.id == card.id)!.priority = card.priority;
    this.allCards.find(x=>x.id == card.id)!.description = card.description;
    this.allCards.find(x=>x.id == card.id)!.title = card.title;
    this.allCards.find(x=>x.id == card.id)!.created = card.created;
    this.allCards.find(x=>x.id == card.id)!.edited = new Date(Date.now());

    //alle Spalten werden geupdated
    this.updateColumns();
  }

  //löscht eine Card
  public deleteCard(id:number) {
    if (!this.allCards.find(x => x.id == id)) {
      return;
    }

    // @ts-ignore
    var card: Card = this.allCards.find(x => x.id == id);
    var index: number = this.allCards.indexOf(card);

    this.allCards.splice(index, 1);
    this.cards$$.next(this.allCards);

    //alle Spalten werden geupdated
    this.updateColumns();
  }


  //Gibt die Cards des jeweiligen Status in Priorisierter Reihenfolge zurück
  public getCardsOfStatus(status:Status) {
    return this.columnCards[status.id];
  }

  //Sortiert aus Allen Cards die Cards mit bestimmtem Status und sortiert diese nach Priorität
  private getCardsWithStatus(status: Status):Card[] {
    let cards1:Card[] = [];
    // @ts-ignore
      for (const card:Card of this.allCards) {
      if (card.status === status) {

        if (!card.priority) {
          card.priority = this.priorityService.getPriority(-1);
        }

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


  //Lädt alle Cards aus der Datenbank
    public loadCardsFromDatabase() {
        return this.dataService.getCardsFromDb()
          .pipe(
            tap((data) => {
              for (let i = 0; i < data.length; i++) {
                const newCard: Card = {
                  id: data[i].id,
                  title: data[i].title,
                  description: data[i].description,
                  priority: this.priorityService.getPriority(data[i].priority),
                  status: this.statusService.getStatus(data[i].status),
                  created: data[i].created,
                  edited: data[i].edited
                };
                this.pushCard(newCard);
              }
              this.isCardsLoading = false;
              console.log("Cards loaded")
            })
          )
    }

    //initialisiert jede Card in die Cards liste
    private pushCard(card: Card): void {
      this.allCards.push(card);
      this.cards$$.next(this.allCards);
    }
}
