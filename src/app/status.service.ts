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
      title: "ToDo",
      limit: false,
      max: 0
    },
    {
      id: 1,
      color: "#1fc2ff",
      title: "In Progress",
      limit: true,
      max: 4
    },
    {
      id: 2,
      color: "#ffc634",
      title: "Test",
      limit: true,
      max: 3
    },
    {
      id: 3,
      color: "#1ab802",
      title: "Done",
      limit: false,
      max: 0
    }
  ];

  constructor() { }

  public getStatus(id:number):Status {
    return (typeof this.status.find(x => x.id === id) != "undefined") ? this.status.find(x => x.id === id)! : this.getStatus(0);
  }

  public getStatusList():Status[] {
    return this.status;
  }

  public setStatus(status:Status):void {
    this.status.find(x=>x.id == status.id)!.color = status.color;
    this.status.find(x=>x.id == status.id)!.limit = status.limit;
    this.status.find(x=>x.id == status.id)!.max = status.max;
    this.status.find(x=>x.id == status.id)!.title = status.title;
  }
}
