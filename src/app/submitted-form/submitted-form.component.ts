import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../survey.service'; // Import the SurveyService
import { MatDialog } from '@angular/material/dialog';
import { LinkDialogComponent } from '../link-dialog/link-dialog.component'; // Import the dialog component



@Component({
  selector: 'app-submitted-form',
  templateUrl: './submitted-form.component.html',
  styleUrls: ['./submitted-form.component.css']
})
export class SubmittedFormComponent {
  authToken: string = '';
  surveyId: any;
  submittedQuestions: any[] = [];

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    this.authToken = localStorage.getItem('authToken') || '';
    this.route.paramMap.subscribe((params) => {
      this.surveyId = params.get('id');
    });
    this.fetchSubmittedQuestions(); // Fetch submitted questions upon component initialization
  }

  openLinkDialog() {
    const dialogRef = this.dialog.open(LinkDialogComponent, {
      width: '1000px', // Adjust the width as needed
      data: { surveyId: this.surveyId }, // Pass dynamicUrl and surveyId as data
      panelClass: 'centered-dialog' // Add this line to use the centered-dialog class
    });
  }

  deleteQuestion(questionId: string): void {
    this.surveyService.delQuestion(questionId, this.authToken).subscribe(() => {
      // Handle the successful deletion, such as reloading the survey list
      this.fetchSubmittedQuestions();
    });
  }

  refresh(){
    this.fetchSubmittedQuestions();
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
