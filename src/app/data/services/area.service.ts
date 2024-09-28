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

  getAreaById(id: number): Observable<IArea> {
    return this.http.get<IArea>(`${this.apiUrl}/${id}`)
  }

  createArea(user: IArea): Observable<IArea> {
    return this.http.post<IArea>(this.apiUrl, user)
  }

  updateArea(user: IArea): Observable<IArea> {
    return this.http.put<IArea>(`${this.apiUrl}/${user.id}`, user)
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
