import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/clientsurvey'; // Update with your API URL
  private clientId: string='';

  constructor(private http: HttpClient) {}

  getClientDataBySurveyId(surveyId: string, authToken: string)
  {
    const url = `${this.apiUrl}/getclient/${surveyId}`;
    
    const headers = new HttpHeaders({
      'auth-token': authToken // Provide the authentication token here
    });

    return this.http.get(url, { headers });

  }

  setClientId(clientId: string) {
    this.clientId = clientId;
  }

  getClientId(): string {
    return this.clientId;

  }

  createClientSurvey(clientData:any, surveyId: string,): Observable<any> {
    const url = `${this.apiUrl}/create/${surveyId}`;
    
    
    // console.warn(authToken);
    
    // Set the headers with the authToken
    // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });

    return this.http.post(url, clientData, { headers });
  }
}
