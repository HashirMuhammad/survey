import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  surveyName: string = '';
  authToken: string = '';

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('authToken') || '';
    // this.route.queryParams.subscribe(params => {
    //   this.authToken = params['response']; // Assign the authToken value
    // });
  }

  createSurvey() {
    const surveyData = { name: this.surveyName };
    
    this.surveyService.createSurveyWithAuthToken(surveyData, this.authToken).subscribe(
      (createdSurvey) => {
        console.log('Survey created:', createdSurvey);
        this.router.navigate(['/surveys']); // Navigate to the survey list
      },
      (error) => {
        console.error('Error creating survey:', error);
      }
    );
  }
}
