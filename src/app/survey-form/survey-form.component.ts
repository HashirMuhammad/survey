import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service'; // Import the SurveyService
import { ActivatedRoute, Router } from '@angular/router';


interface Question {
  type: string;
  question: string;
  options: string[];
  survey_Id: string;
}

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
  providers: [SurveyService], // Add the SurveyService to providers
})
export class SurveyFormComponent implements OnInit {
  authToken: string = '';
  surveyId: any;
  questions: Question[] = [];
  newOption: string = '';
  currentQuestionIndex: number = 0;
  submittedQuestions: any[] = [];

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.warn("onint")
    this.authToken = localStorage.getItem('authToken') || '';
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('id');
      console.log('Survey ID:', this.surveyId);
    });
    this.addQuestion();
    this.fetchSubmittedQuestions(); // Fetch submitted questions upon component initialization
  }

  isQuestionEmpty(question: Question): boolean {
  return !question || !question.question || question.question.trim() === '';
}

  

  deleteQuestion(questionId: string): void {
    this.surveyService.delQuestion(questionId, this.authToken).subscribe(() => {
      // Handle the successful deletion, such as reloading the survey list
      this.fetchSubmittedQuestions();
    });
  }
  
  form(){
    this.router.navigate(['/form', this.surveyId]);
  }

  addQuestion() {
    this.questions.push({
      type: 'plain',
      question: '',
      options: [],
      survey_Id: this.surveyId,
    });
  }
  
  onTypeChange(index: number) {
    this.currentQuestionIndex = index;
    this.newOption = '';
  }

  addOption(index: number) {
    if (this.newOption) {
      this.questions[index].options.push(this.newOption);
      this.newOption = '';
    }
  }

  isCurrentQuestionComplete() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.type === 'plain') {
      return currentQuestion.question.trim() !== '';
    } else if (currentQuestion.type === 'dropdown') {
      return (
        currentQuestion.question.trim() !== '' &&
        currentQuestion.options.length >= 2
      );
    }
    return false;
  }

  

  refresh(){
    this.fetchSubmittedQuestions();
  }

  submitSurvey() {
    if (this.isCurrentQuestionComplete()) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
       // Separate the values from the currentQuestion object
    const questionType = currentQuestion.type;
    const questionText = currentQuestion.question;
    const questionOptions = currentQuestion.options;

    // Log the values to the console to verify
    console.warn('Question Type:', questionType);
    console.warn('Question Text:', questionText);
    console.warn('Question Options:', questionOptions);

    // Create a viewModel object with the separated values
    // const viewModel: any = {
    //   type: questionType,
    //   question: questionText,
    //   options: questionOptions,
    //   survey_Id: this.surveyId,
    // };

    //Check if the current question is empty
      if (this.isQuestionEmpty(currentQuestion)) {
        console.error('Question cannot be empty.');
        return; // Exit the function if the question is empty
      }

      this.surveyService
        .addQuestions(currentQuestion, this.authToken)
        .subscribe(
          (response) => {
            console.log('submitSurvey=>API Response:', response);
            this.clearFields();

            // const question = JSON.parse(response);
            const quesid = response._id;
            console.warn(quesid);

            // Extract question IDs from the response
            const questionIds = response.map((question: any) => question._id);
            // Associate the question IDs with the survey using the API endpoint
            this.surveyService
              .associateQuestionIdsWithSurvey(
                this.surveyId!,
                questionIds,
                this.authToken
              )
              .subscribe(
                (associateResponse) => {
                  console.log(
                    'Question IDs associated with survey:',
                    associateResponse
                  );
                  this.submittedQuestions.push(
                    ...this.questions.map((question) => ({
                      ...question,
                      surveyId: this.surveyId,
                    }))
                  );
                  this.fetchSubmittedQuestions();
                  this.questions = [];
                },
                (associateError) => {
                  console.error(
                    'Error associating question IDs with survey:',
                    associateError
                  );
                }
                
              );
          },
          (error) => {
            console.error('Error saving questions:', error);
          }
        );
    }
  }

  clearFields() {
    // Clear the input fields and reset the current question
    this.questions = [
      {
        type: 'plain',
        question: '',
        options: [],
        survey_Id: this.surveyId,
      },
    ];
    this.currentQuestionIndex = 0;
    this.newOption = '';
  }


  fetchSubmittedQuestions() {
    this.surveyService
      .getSubmittedQuestions(this.surveyId, this.authToken)
      .subscribe(
        (questions: any) => {
          this.submittedQuestions = questions;
          console.warn('submittedQuestions:', this.submittedQuestions);
        },
        (error) => {
          console.error('Error fetching submitted questions:', error);
        }
      );
  }
}
