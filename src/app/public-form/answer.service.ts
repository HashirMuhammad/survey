import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:3000/api/answer'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createAnswerSurvey(submittedAnswers:any, surveyId: string): Observable<any> {
    const url = `${this.apiUrl}/create/${surveyId}`;
    
    // console.warn(authToken);
    
    // Set the headers with the authToken
    // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });

    return this.http.post(url, submittedAnswers, { headers });
  }
}
