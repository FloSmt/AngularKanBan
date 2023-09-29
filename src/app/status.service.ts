import {Injectable} from '@angular/core';
import {Status} from "./status";
import {DataService} from "./db.service";
import {Observable, tap} from "rxjs";
import {Priority} from "./priority";

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  public isStatusLoading:boolean = true;
  default:Status = {id:-1, color:"#808080", title:"UNSET", limit: false, max: 0};


  //Liste alle standard Status
  status:Status[] = [
    {
      id: 0,
      color: "#ffffff",
      title: "",
      limit: false,
      max: 0
    },
    {
      id: 1,
      color: "#ffffff",
      title: "",
      limit: true,
      max: 0
    },
    {
      id: 2,
      color: "#ffffff",
      title: "",
      limit: true,
      max: 0
    },
    {
      id: 3,
      color: "#ffffff",
      title: "",
      limit: false,
      max: 0
    }
  ];

  constructor(private dbService: DataService) { }

  //gibt Status mit jeweiliger ID zurück
  public getStatus(id:number):Status {
    return (typeof this.status.find(x => x.id === id) != "undefined") ? this.status.find(x => x.id === id)! : this.default;
  }

  //gibt die Statusliste zurück
  public getStatusList(): Status[] {
    return this.status;
  }

  //Lädt die Status von der Datenbank
  loadStatusFromDb(): Observable<any> {
    return this.dbService.getStatusFromDb().pipe(
      tap((data) => {
        for (let i = 0; i < data.length; i++) {
          const newStatus: Status = {id: data[i].id-1, title: data[i].title, color: data[i].color, limit: data[i].limits, max: data[i].max};
          this.setStatus(newStatus);
        }
        this.isStatusLoading = false;
        console.log("Status loaded");
      })
    )
  }

  //Update eines bestimmten Status
  public setStatus(status:Status):void {
    if (this.status.find(x=>x.id == status.id)) {
      this.status.find(x=>x.id == status.id)!.color = status.color;
      this.status.find(x=>x.id == status.id)!.limit = status.limit;
      this.status.find(x=>x.id == status.id)!.max = status.max;
      this.status.find(x=>x.id == status.id)!.title = status.title;
    }
  }
}
