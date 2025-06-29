import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${environment.apiUrl}reservation`; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  validateQR(qrCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate-qr`, { qrCode });
  }

}
