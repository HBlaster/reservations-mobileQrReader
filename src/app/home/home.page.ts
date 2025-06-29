import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  showScanner = false;
  scannedResult: string | null = null;

  constructor(private router: Router, private reservationService: ReservationService) {}

  logout() {
    localStorage.removeItem('loginToken');
    this.router.navigate(['/auth/login']);
  }

    handleScan(result: string) {
    this.scannedResult = result;
    this.showScanner = false;
    console.log('Resultado del escaneo:', result);

    this.reservationService.validateQR(result).subscribe({
      next: (response) => {
        console.log('Validación exitosa:', response);
      },
      error: (err) => {
        console.error('Error en validación:', err);
      }
    });
  }

  abrirScanner() {
    this.showScanner = true;
  }

  cerrarScanner() {
    this.showScanner = false;
  }

}
