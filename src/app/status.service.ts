import {Injectable} from '@angular/core';
import {Status} from "./status";
import {DataService} from "./db.service";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private status$$ = new BehaviorSubject<Status[]>([]);
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

  public getStatus(id:number):Status {
    return (typeof this.status.find(x => x.id === id) != "undefined") ? this.status.find(x => x.id === id)! : this.getStatus(0);
  }

  getStatus$(): Observable<Status[]> {
    return this.status$$.asObservable();
  }

  public getStatusList(): Status[] {
    return this.status;
  }

  loadStatusFromDb() {
    this.dbService.getStatusFromDb().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        const newStatus: Status = {id: data[i].id-1, title: data[i].title, color: data[i].color, limit: data[i].limits, max: data[i].max};
        this.setStatus(newStatus);
      }
        return true;
    });
      return false;
  }

  public setStatus(status:Status):void {
    this.status.find(x=>x.id == status.id)!.color = status.color;
    this.status.find(x=>x.id == status.id)!.limit = status.limit;
    this.status.find(x=>x.id == status.id)!.max = status.max;
    this.status.find(x=>x.id == status.id)!.title = status.title;
  }
}
