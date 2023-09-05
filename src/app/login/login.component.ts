import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData).subscribe(
      (response) => {
        console.log('Login successful', response);
        // // Display a success alert
        // alert('Login successful');
        const authToken = response.authToken; // Assuming your API response structure is { authToken: '...' }
        localStorage.setItem('authToken', authToken); // Store the token in local storage
        // Navigate to the desired page after successful login
        this.router.navigate(['/create-survey']); // Change 'dashboard' to the desired page
        
      },
      (error) => {
        console.error('Login error', error);
        // Display an error alert
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
