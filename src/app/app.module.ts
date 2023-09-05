import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubmittedFormComponent } from './submitted-form/submitted-form.component';
import { PublicFormComponent } from './public-form/public-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LinkDialogComponent } from './link-dialog/link-dialog.component';
import { UserServeyComponent } from './user-servey/user-servey.component';
import { GivenSurveyComponent } from './given-survey/given-survey.component';
import { GivenFinalSurveyComponent } from './given-final-survey/given-final-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    SignupComponent,
    LoginComponent,
    SurveyListComponent,
    CreateSurveyComponent,
    NavbarComponent,
    SubmittedFormComponent,
    PublicFormComponent,
    LinkDialogComponent,
    UserServeyComponent,
    GivenSurveyComponent,
    GivenFinalSurveyComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ], // Add FormsModule here
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
