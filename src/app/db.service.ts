import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/index.php'; // Pfad zum PHP-Skript anpassen

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?endpoint=get_data`);
  }

  //aktualisiert die den Status nach Drag&Drop der Card in der Db
  updateCardStatusInDb(cardId: number, newStatusId: number): Observable<any> {
    const url = `${this.apiUrl}?endpoint=update&id=${cardId}&statusId=${newStatusId}`;
    const data = { cardId, newStatusId };
    return this.http.post<any>(url, data);
  }

}

export class DbService {
}
