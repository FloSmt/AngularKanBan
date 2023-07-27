import { Injectable } from '@angular/core';
import {Priority} from "./priority";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  priority:Priority[] = [
    {
      color: "#ff0000",
      name: "HIGH"
    },
    {
      color: "#ffbf00",
      name: "MEDIUM"
    },
    {
      color: "#00ff40",
      name: "LOW"
    }
  ];
  constructor() { }

  public getPriority():Priority[] {
    return this.priority;
  }
}
