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

  async handleScan(result: string) {
  console.log('🔍 Escaneando código QR:', result);
  this.showScanner = false;
  this.scannedResult = result;

  try {
    const response: any = await this.reservationService.validateQR(this.scannedResult).toPromise();
    console.log('✅ Respuesta de validación:', response);

    if (response.status === 'success') {
      await this.showAlert('Validación Exitosa', 'El código QR es válido.');
    } else if (response.status === 'checked_in') {
      await this.showAlert('Código Ya Utilizado', 'Este QR ya fue registrado anteriormente.');
    } else {
      await this.showAlert('Error', 'Respuesta inesperada del servidor.');
    }
  } catch (error) {
    console.error('❌ Error en validación:', error);
    await this.showAlert('Error', 'Ocurrió un error al validar el QR. Inténtelo de nuevo.');
  } finally {
    this.scannedResult = null;
  }
}

private async showAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK'],
  });
  await alert.present();
}


  abrirScanner() {
    this.showScanner = true;
  }

  cerrarScanner() {
    this.showScanner = false;
  }
}
