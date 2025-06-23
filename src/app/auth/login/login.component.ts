import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder
  ) { 
    // Initialize the form with validation
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

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
