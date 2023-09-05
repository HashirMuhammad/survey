import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Question {
  type: string;
  question: string;
  options: string[];
  survey_Id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:3000/api/questions'; // Update with your API URL
  private baseUrl = 'http://localhost:3000/api/surveys'; // Your backend API base URL
  private clientUrl = 'http://localhost:3000/api/clientsurvey'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getSubmittedQuestionsandAnswers(surveyId: string, authToken: string): Observable<any> {
    const url = `${this.clientUrl}/${surveyId}`;
    
    // console.warn("getSubmittedQuestions=>token" ,authToken);
    // console.warn("getSubmittedQuestions=>survey id:", surveyId)
    
    // Set the headers with the authToken
    // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'auth-token': authToken // Provide the authentication token here
    });

    return this.http.get(url, { headers });
  }

  getSurveysAndClients(authToken: string): Observable<any> {
    const url = `${this.clientUrl}/surveys-and-data`;
    const headers = new HttpHeaders({
      'auth-token': authToken // Provide the authentication token here
    });
    return this.http.get(url, { headers });
  }

  createSurveyWithAuthToken(surveyData: any, authToken: string): Observable<any> {
    const url = `${this.baseUrl}/create`;
    
    // console.warn(authToken);
    
    // Set the headers with the authToken
    // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken // Provide the authentication token here
      
      
    });

    return this.http.post(url, surveyData, { headers });
  }

  
  getSurveys(authToken: string): Observable<any> {
    // Set the headers with the authToken
    const headers = new HttpHeaders({
      'auth-token': authToken // Provide the authentication token here
    });

    return this.http.get(`${this.baseUrl}/user`, { headers });
  }

  // createSurvey(surveyData: any): Observable<any> {
  //   const url = `${this.baseUrl}/create`; // Update with the correct URL
  //   return this.http.post(url, surveyData);
  // }

  // addQuestions(questions: Question[], surveyId: string, authToken: string): Observable<any> {
  //   const url = `${this.apiUrl}/create?surveyId=${surveyId}`;
  //   return this.http.post(url, questions);
  // }
  addQuestions(viewModel: any, authToken:string): Observable<any> {
    const url = `${this.apiUrl}/create/${viewModel.surveyId}`;
    
    // console.warn("addQuestions=>question:", question)
    // console.warn(authToken);
    
    // // Set the headers with the authToken
    // // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken // Provide the authentication token here
      
      
    });

    return this.http.post(url,viewModel, { headers } );
  }
  
  delSurvey(surveyId: string, authToken: string): Observable<any> {
    const url = `${this.baseUrl}/${surveyId}`;
    
    // console.warn("addQuestions=>question:", question)
    // console.warn(authToken);
    
    // // Set the headers with the authToken
    // // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken // Provide the authentication token here
      
      
    });

    return this.http.delete(url, { headers } );
  }

  delQuestion(questionId: string, authToken: string): Observable<any> {
    const url = `${this.apiUrl}/${questionId}`;
    
    // console.warn("addQuestions=>question:", question)
    // console.warn(authToken);
    
    // // Set the headers with the authToken
    // // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken // Provide the authentication token here
      
      
    });

    return this.http.delete(url, { headers } );
  }

  // getSubmittedQuestions(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  getSubmittedQuestions(surveyId: string, authToken: string): Observable<any> {
    const url = `${this.apiUrl}/${surveyId}`;
    
    // console.warn("getSubmittedQuestions=>token" ,authToken);
    // console.warn("getSubmittedQuestions=>survey id:", surveyId)
    
    // Set the headers with the authToken
    // Set the headers with the auth-token format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken // Provide the authentication token here
      
      
    });

    return this.http.get(url, { headers });
  }


  associateQuestionIdsWithSurvey(surveyId: string, questionIds: string[], authToken: string): Observable<any> {
    const url = `${this.baseUrl}/${surveyId}/addquestion`; // Use the appropriate URL for your API
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': authToken
    });

    const requestBody = {
      questionIds: questionIds
    };

    return this.http.post(url, requestBody, { headers });
  }
}
