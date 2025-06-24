import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}auth/login`;

  login(oUser: any){
    return this.http.post(this.apiUrl, oUser);
  }

   logout(): void {
    localStorage.removeItem('access_token');
  }
}
