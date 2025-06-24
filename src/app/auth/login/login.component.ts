import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    // Initialize the form with validation
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(0)]],
    });
  }

  ngOnInit() {
  }
  login() {
    if (this.form.valid) {

      this.authService.login(this.form.value).subscribe({
        next: (response: any) => {
          const token = response.access_token;
          localStorage.setItem('loginToken', token);
          // Redirect to home page after login
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }

}
