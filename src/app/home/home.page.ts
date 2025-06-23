import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  logout() {
    // Clear the token from local storage
    localStorage.removeItem('loginToken');
    // Redirect to login page after logout
    this.router.navigate(['/auth/login']);
  }

}
