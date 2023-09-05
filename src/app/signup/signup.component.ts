import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.signup(userData).subscribe(
      (response) => {
        console.log('Signup successful', response);
        // Display an alert
        alert('User created successfully! Please log in.');
        // Navigate to the login component
        this.router.navigate(['/survey']); // Use the route path for the login component
        // this.router.navigateByUrl('/login');
        // window.location.href = '/';
      },
      (error) => {
        alert('Invalid Credientials! Please log in again.');
        console.error('Signup error', error);
        // Handle error (show error message to the user)
      }
    );
  }
}
