import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  showScanner = false;
  scannedResult: string | null = null;

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private alertController: AlertController
  ) {}

  logout() {
    localStorage.removeItem('loginToken');
    this.router.navigate(['/auth/login']);
  }

  handleScan(result: string) {
    this.scannedResult = result;
    this.showScanner = false;
    console.log('Resultado del escaneo:', result);

    this.reservationService.validateQR(result).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.alertController
            .create({
              header: 'Validación Exitosa',
              message: 'El código QR es válido.',
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
        } else if (response.status === 'checked_in') {
          this.alertController
            .create({
              header: 'Error',
              message: 'El código QR ya ha sido utilizado.',
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
        }
        console.log('response:', response);
      },
      error: (err) => {
        console.error('Error en validación:', err);
        this.alertController
          .create({
            header: 'Error',
            message:
              'Ocurrió un error al validar el código QR. Por favor, inténtelo de nuevo.',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
      },
    });
  }
  abrirScanner() {
    this.showScanner = true;
  }

  cerrarScanner() {
    this.showScanner = false;
  }
}
