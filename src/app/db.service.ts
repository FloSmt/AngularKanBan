import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://localhost:8080/api/index.php';

  constructor(private http: HttpClient) { }

  //gibt alle cards aus der db zurück
  getCardsFromDb(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?endpoint=get_cards`);
  }

  //aktualisiert die den Status nach Drag&Drop und edit input der Card in der db
  updateCardInDb(id: number, title: string | null, statusId: number | null, priorityId: number | null, description: string | null, edited: Date | null): Observable<any> {
    const url = `${this.apiUrl}?endpoint=update_card&id=${id}&title=${title}&statusId=${statusId}&priority=${priorityId}&description=${description}&edited=${edited}`;
    const data = { id, title, statusId, priorityId, description, edited };
    return this.http.post(url, data);
  }

  //fügt eine neue card in der db hinzu
  insertNewCard(newStatusId:number, title:string, priorityId:number) {
    const url = `${this.apiUrl}?endpoint=create&title=${title}&statusId=${newStatusId}&priorityId=${priorityId}`;
    const data = {
      newStatusId: newStatusId,
      title: title,
      priorityId:priorityId,
    };

    return this.http.post(url, data);
  }

  getStatusFromDb(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?endpoint=get_status`);
  }

  updateStatusInDb(id: number, title:string, color: string, limits: boolean, max: number) {
    const url = `${this.apiUrl}?endpoint=update_status&id=${id}&title=${title}&color=${color}&limits=${limits}&max=${max}`
    const data =  {
      id: id,
      title: title,
      color: color,
      limits: limits,
      max: max
    }
    console.log(data);
    return this.http.post(url, data);
  }

  getPriorityFromDb(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?endpoint=get_priority`);
  }

  deleteCardinDb(id:number): Observable<any> {
    const url = `${this.apiUrl}?endpoint=delete_card&id=${id}`;
    const data = {
      id:id
    };
    return this.http.post<any>(url, data);
  }
}
