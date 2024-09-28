import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArea } from '../interfaces/IArea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:3000/areas'; // URL del servidor JSON

  constructor(private http: HttpClient) {}

  getAreas(): Observable<IArea[]> {
    return this.http.get<IArea[]>(this.apiUrl);
  }

  createArea(area: IArea): Observable<IArea> {
    return this.http.post<IArea>(this.apiUrl, area);
  }

  updateArea(area: IArea): Observable<IArea> {
    return this.http.put<IArea>(`${this.apiUrl}/${area.codigo}`, area);
  }

  deleteArea(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }
}
