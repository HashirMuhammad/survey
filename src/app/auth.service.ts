import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // Your backend API base URL

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<any> {
    const url = `${this.baseUrl}/createuser`;
    return this.http.post(url, userData);
  }

  login(userData: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, userData);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken'); // Retrieve the token from storage
    console.warn(token);
    if (token) {
      return this.isTokenValid(token); // Use your token validation logic
    }
    console.warn('No token, user is not logged in')
    return false; // No token, user is not logged in
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      const expirationDate = new Date(0); // Initialize with the epochs
      expirationDate.setUTCSeconds(decodedToken.exp);
      const now = new Date();
      console.warn("Token is valid");
  
      // return now < expirationDate;
      return true;
    } catch (error) {
      console.warn("Token is invalid or expired");
      // Token is invalid or expired
      return false;
    }
    
  }
  
}
