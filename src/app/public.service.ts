import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private baseUrl = 'http://localhost:3000/api/surveys/public'; // Your backend API base URL


  constructor(private http: HttpClient) { }
  
  getPublicSurvey(survey_Id: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/${survey_Id}`);
  }

}
