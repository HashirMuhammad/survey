import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-servey/user.service';

@Component({
  selector: 'app-user-servey',
  templateUrl: './user-servey.component.html',
  styleUrls: ['./user-servey.component.css']
})
export class UserServeyComponent {
  surveyId:string='';
  name:string='';
  email:string='';
  phone:string='';
  errorMessage: string = ''; // Variable to store error message

  constructor(
    private userService: UserService,
    private route: ActivatedRoute, // Inject ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the 'surveyId' from the URL
    this.route.paramMap.subscribe((params) => {
      const surveyIdParam = params.get('surveyId');
      if (surveyIdParam !== null) {
        this.surveyId = surveyIdParam;
        console.warn(this.surveyId)
      } else {
        // Handle the case where 'surveyId' is not present in the URL
        console.error('surveyId parameter is missing in the URL');
      }
    });
  }

  

  startsurvey(){
    const clientData = {
      name: this.name,
      email: this.email,
      phone: this.phone
    };
    // Call the createClientSurvey method with the client data
  this.userService.createClientSurvey(clientData, this.surveyId)
  .subscribe(
    (response) => {
      // Handle the response here
      console.log(response);
      const clientId = response._id
      this.userService.setClientId(clientId);
      // Redirect to the public survey page
      this.router.navigate(['/public', this.surveyId]);
    },
    (error) => {
      console.error('Error:', error);
      if (error.error && error.error.message) {
        // Set the error message from the server response
        this.errorMessage = error.error.message;
        alert(this.errorMessage)
      } else {
        // Fallback error message if no specific message is received
        this.errorMessage = 'An error occurred while processing your request.';
      }
    }
  );
  }

}
