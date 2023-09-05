import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';


@Component({
  selector: 'app-given-survey',
  templateUrl: './given-survey.component.html',
  styleUrls: ['./given-survey.component.css']
})
export class GivenSurveyComponent implements OnInit {
  surveyData: any[] = []; // Initialize an array to store survey data
  authToken: string = '';


  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('authToken') || '';
    // Fetch survey data from the service
    this.surveyService.getSurveysAndClients(this.authToken).subscribe((data: any) => {
      // Convert the object with keys to an array of survey data
      this.surveyData = Object.values(data.finalResult);
    });
  }
}
