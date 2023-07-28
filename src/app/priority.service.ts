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
      color: "#00ff40",
      name: "LOW"
    }
  ];
  constructor() { }

  public getPriority(id:number):Priority {
    return (typeof this.priority.find(x => x.id === id) != "undefined") ? this.priority.find(x => x.id === id)! : this.default;
  }

  public addPriority(name:string, color:string) {
    this.priority.push({id:this.priority.length,color:color,name:name})
  }

  public deletePriority(id:number) {
    if (typeof this.priority.find(x => x.id === id) != "undefined") {
      this.priority.splice(this.priority.indexOf(this.priority.find(x => x.id === id)!),1);
    }
  }
}
