import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { UserService } from '../user-servey/user.service';
import { AnswerService } from '../public-form/answer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-public-form',
  templateUrl: './public-form.component.html',
  styleUrls: ['./public-form.component.css'],
})
export class PublicFormComponent implements OnInit {
  submittedQuestions: any[] = [];
  surveyId: string = '';
  clientId: string = '';
  formData: any = {}; // Create an object to store form data
  isFormValid: boolean = true; // Add a flag to track form validity

  constructor(
    private publicService: PublicService,
    private userService: UserService,
    private answerService: AnswerService,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the 'surveyId' from the URL
    this.route.paramMap.subscribe((params) => {
      const surveyIdParam = params.get('surveyId');
      if (surveyIdParam !== null) {
        this.surveyId = surveyIdParam;
        this.fetchSubmittedQuestions(); // Fetch data using the 'surveyId'
      } else {
        // Handle the case where 'surveyId' is not present in the URL
        console.error('surveyId parameter is missing in the URL');
      }
    });
    this.isFormValid = true;

    // Move the formData initialization here, after fetching submitted questions
    this.clientId = this.userService.getClientId();
    this.submittedQuestions.forEach((question) => {
      this.formData[question._id] = ''; // Initialize with empty values using question._id
    });
  }

  fetchSubmittedQuestions() {
    this.publicService.getPublicSurvey(this.surveyId).subscribe(
      (questions: any) => {
        this.submittedQuestions = questions;
        console.warn('submittedQuestions:', this.submittedQuestions);

        // Initialize the formData object with empty values using question._id
        this.clientId = this.userService.getClientId();
        this.submittedQuestions.forEach((question) => {
          this.formData[question._id] = '';
        });
      },
      (error) => {
        console.error('Error fetching submitted questions:', error);
      }
    );
  }

  submitForm() {
    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key) && !this.formData[key]) {
        this.isFormValid = false;
        return; // Exit the loop and prevent submission
      }
    }
    const submittedAnswers: any = [];

    // Iterate through submitted questions and populate submittedAnswers
    this.submittedQuestions.forEach((question) => {
      const answer = this.formData[question._id]; // Get the answer from the formData object
      console.warn(answer);
      const user_id = this.clientId;
      const question_id = question._id;

      submittedAnswers.push({
        answer,
        question_id,
        user_id,
      });
    });

    // Now, 'submittedAnswers' contains the data in the desired format
    console.log('Submitted Answers:', submittedAnswers);

    // You can send 'submittedAnswers' to your server or perform any other actions as needed
    this.answerService
      .createAnswerSurvey(submittedAnswers, this.surveyId)
      .subscribe(
        (response) => {
          // Handle the response here
          console.log(response);
          const clientId = response._id;
          this.userService.setClientId(clientId);
        },
        (error) => {
          // Handle any errors
          console.error(error);
        }
      );
    this.router.navigate(['/public', this.surveyId]);
  }
}
