// Import the necessary modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../survey.service';
import { UserService } from '../user-servey/user.service'; // Import your client service


@Component({
  selector: 'app-given-final-survey',
  templateUrl: './given-final-survey.component.html',
  styleUrls: ['./given-final-survey.component.css'],
})
export class GivenFinalSurveyComponent implements OnInit {
  authToken: string = '';
  surveyId: any;
  questionsWithAnswers: any[] = [];
  clientData: any; // Define a property to store the client data

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private userService: UserService // Inject your client service
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('surveyId');
    });

    this.authToken = localStorage.getItem('authToken') || '';

    // Fetch questions and answers for the specified survey and populate the questionsWithAnswers array
    // Update the component to correctly access questions and answers
    this.surveyService
      .getSubmittedQuestionsandAnswers(this.surveyId, this.authToken)
      .subscribe((data: any) => {
        this.questionsWithAnswers = data.map((item: any) => {
          return {
            question: item.question, // Make sure this is correctly accessing the question data
            answers: item.answers,
          };
        });
      });

    this.userService
      .getClientDataBySurveyId(this.surveyId, this.authToken)
      .subscribe((data) => {
        this.clientData = data;
      });
  }
}
