import { Injectable } from '@angular/core';
import {Priority} from "./priority";
import {DataService} from "./db.service";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  default:Priority = {id:-1,color:"#808080",name:"UNSET"};

  priority:Priority[] = [
    {
      id: 0,
      color: "#7100B8",
      name: "IMPORTANT"
    },
    {
      id: 1,
      color: "#ff0000",
      name: "HIGH"
    },
    {
      id: 2,
      color: "#ffbf00",
      name: "MEDIUM"
    },
    {
      id: 3,
      color: "#22AA09",
      name: "LOW"
    },
  ];
  constructor(private dbService : DataService) { }

  public getPriority(id:number):Priority {
    return (typeof this.priority.find(x => x.id === id) != "undefined") ? this.priority.find(x => x.id === id)! : this.getPriority(0);
  }

  public getPriorities():Priority[] {
    return this.priority;
  }

  public setPriorities(priority: Priority) {
    this.priority.find(x=>x.id == priority.id)!.color = priority.color;
    this.priority.find(x=>x.id == priority.id)!.name = priority.name;
  }

  loadPriorityFromDb() {
    this.dbService.getPriorityFromDb().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        const newPriority : Priority = {id: data[i].id-1, color: data[i].color, name: data[i].name};
        this.setPriorities(newPriority);
      }
      return true;
    });
    return false;
  }


}
