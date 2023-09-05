import { Component, OnInit } from '@angular/core';
import { SurveyService} from '../survey.service'
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: any[] = [];
  authToken: string = '';

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('authToken') || '';
    this.fetchSurveys();
  }

  deleteSurvey(surveyId: string): void {
    this.surveyService.delSurvey(surveyId, this.authToken).subscribe(() => {
      // Handle the successful deletion, such as reloading the survey list
      this.fetchSurveys();
    });
  }

  fetchSurveys() {
    this.surveyService.getSurveys(this.authToken).subscribe(
      (surveys) => {
        this.surveys = surveys;
      },
      (error) => {
        console.error('Error fetching surveys:', error);
      }
    );
  }
  
}
