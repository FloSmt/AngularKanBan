import { Injectable } from '@angular/core';
import {Status} from "./status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  status:Status[] = [
    {
      id: 0,
      color: "#c143ff",
      title: "ToDo"
    },
    {
      id: 1,
      color: "#1fc2ff",
      title: "In Progress"
    },
    {
      id: 2,
      color: "#ffc634",
      title: "Test"
    },
    {
      id: 3,
      color: "#1ab802",
      title: "Done"
    }
  ];
  constructor() { }

  public getStatus(id:number):Status {
    return (typeof this.status.find(x => x.id === id) != "undefined") ? this.status.find(x => x.id === id)! : this.getStatus(0);
  }

  public getStatusList():Status[] {
    return this.status;
  }
}
