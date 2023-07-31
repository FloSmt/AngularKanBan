import { Injectable } from '@angular/core';
import {Priority} from "./priority";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  default:Priority = {id:-1,color:"grey",name:"UNSET"};

  priority:Priority[] = [
    {
      id: 0,
      color: "#ff0000",
      name: "HIGH"
    },
    {
      id: 1,
      color: "#ffbf00",
      name: "MEDIUM"
    },
    {
      id: 2,
      color: "#22AA09",
      name: "LOW"
    },
    {
      id: 3,
      color: "#7100B8",
      name: "IMPORTANT"
    }
  ];
  constructor() { }

  public getPriority(id:number):Priority {
    return (typeof this.priority.find(x => x.id === id) != "undefined") ? this.priority.find(x => x.id === id)! : this.default;
  }

  public getPriorities():Priority[] {
    return this.priority;
  }
}
