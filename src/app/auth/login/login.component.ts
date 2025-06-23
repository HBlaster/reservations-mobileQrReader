import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    // Simulate a login action
    const token = 'efwefwef'; // This should be replaced with actual token from login service
    localStorage.setItem('loginToken', token);
    // Redirect to home page after login
    this.router.navigate(['/home']);
  }

}
