import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login'; // URL del servidor JSON
  private readonly storageKey = 'loggedInUser'; // Clave para localStorage

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.saveUserToLocalStorage(user); 
          return { message: 'logueado', user };
        } else {
          throw new Error('Credenciales malas');
        }
      })
    );
  }

  private saveUserToLocalStorage(user: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user)); // Guarda el usuario en localStorage
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null; // Recupera el usuario de localStorage
  }

  logout(): void {
    localStorage.removeItem(this.storageKey); // Elimina el usuario del localStorage
  }

  isLoggedIn(): boolean {
    return !!this.getLoggedInUser(); // Comprueba si hay un usuario autenticado
  }
}
