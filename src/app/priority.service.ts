import { Injectable } from '@angular/core';
import {Priority} from "./priority";
import {DataService} from "./db.service";
import {catchError, of, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  //Default Priorität UNSET
  default:Priority = {id:-1, sortid: -1,color:"#808080",name:"UNSET"};

  public isPriorityLoading = true;

  //Liste mit allen Prioritäten (hier Platzhalter, wird mit Datenbank aktualisiert)
  private priority:Priority[] = [
    {
      id: 0,
      sortid: 0,
      color: "#ffffff",
      name: ""
    },
    {
      id: 1,
      sortid: 0,
      color: "#ffffff",
      name: ""
    },
    {
      id: 2,
      sortid: 0,
      color: "#ffffff",
      name: ""
    },
  ];


  //Temporäre Liste der Prioritäten, um diese im Edit menü umsortieren zu können
  tmpPriorities:Priority[] = [];

  //gibt die Temporäre Liste zurück
  public getTmpPriorities(){
    return this.tmpPriorities;
  }

  //aktuallisiert Tmp list mit aktueller Reihenfolge
  public updateTmpPriorities() {
    this.tmpPriorities = this.priority.slice(0, this.priority.length);
  }

  constructor(private dbService : DataService) { }

  //Gibt die Prioritäten nach ID zurück
  public getPriority(id:number):Priority {
    return (typeof this.priority.find(x => x.id === id) != "undefined") ? this.priority.find(x => x.id === id)! : this.default;
  }

  //Gibt die liste aller Prioritäten zurück
  public getPriorities():Priority[] {
    return this.priority;
  }

  public deletePriority(id:number) {
    if (this.priority.find(x=>x.id == id)) {
      let index = this.priority.indexOf(this.priority.find(x=>x.id == id)!);
      this.priority.splice(index, 1);
    }
  }

  //update der Priorität
  public setPriorities(priority: Priority) {
    if (this.priority.find(x=>x.id == priority.id)) {
      this.priority.find(x=>x.id == priority.id)!.color = priority.color;
      this.priority.find(x=>x.id == priority.id)!.sortid = priority.sortid;
      this.priority.find(x=>x.id == priority.id)!.name = priority.name;

    }else {

      this.priority.push(priority);
    }

    this.sortPriorityList();
  }

  //Lädt die prioritäten aus der DB
  loadPriorityFromDb() {
    return this.dbService.getPriorityFromDb()
      .pipe(
        tap((data) => {
          this.priority = [];
          for (let i = 0; i < data.length; i++) {
            const newPriority : Priority = {id: data[i].id, sortid: data[i].sortid, color: data[i].color, name: data[i].name};
            this.setPriorities(newPriority);
          }

          this.updateTmpPriorities();
          this.isPriorityLoading = false;
          console.log("priority loaded");
        })
      )
  }

  //Sortiert die liste nach der Sortid (aufsteigend)
  private sortPriorityList() {
    this.priority.sort(function (a,b) {return (a.sortid)-(b.sortid);});
  }
}
