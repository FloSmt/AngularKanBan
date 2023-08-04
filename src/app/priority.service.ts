import { Injectable } from '@angular/core';
import {Priority} from "./priority";

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
  constructor() { }

  public getPriority(id:number):Priority {
    return (typeof this.priority.find(x => x.id === id) != "undefined") ? this.priority.find(x => x.id === id)! : this.default;
  }

  public getPriorities():Priority[] {
    return this.priority;
  }

  public setPriorities(priorities:Priority[]) {
    this.priority = priorities;
  }
}
