import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { AuthGuard } from './auth.guard';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SubmittedFormComponent } from './submitted-form/submitted-form.component';
import { PublicFormComponent } from './public-form/public-form.component';
import { UserServeyComponent } from './user-servey/user-servey.component';
import { GivenSurveyComponent } from './given-survey/given-survey.component';
import { GivenFinalSurveyComponent } from './given-final-survey/given-final-survey.component';



const routes: Routes = [
  { 
    path: 'givenfinalsurvey/:surveyId', 
    component:  GivenFinalSurveyComponent
  },
  { 
    path: 'givensurvey', 
    component:  GivenSurveyComponent
  },
  { 
    path: 'public/:surveyId', 
    component:  PublicFormComponent
  },
  { 
    path: 'userform/:surveyId', 
    component:  UserServeyComponent
  },
  { 
    path: 'surveys', 
    component: SurveyListComponent 
  },
  { 
    path: 'form/:id', 
    component: SubmittedFormComponent 
  },
  { 
    path: 'create-survey', 
    component: CreateSurveyComponent 
  },
  {
    path: 'surveys/:id',
    component: SurveyFormComponent,
    canActivate: [AuthGuard] // Add the AuthGuard here
  },
  {
    path: 'surveys',
    component: SurveyListComponent,
    canActivate: [AuthGuard] // Add the AuthGuard here
  },
  {
    path: 'create-survey',
    component: CreateSurveyComponent,
    canActivate: [AuthGuard] // Add the AuthGuard here
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    component: SignupComponent 
  },
  { 
    path: 'surveys/:id', 
    component: SurveyFormComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  // { 
  //   path: '', 
  //   redirectTo: '/survey', 
  //   pathMatch: 'full' ,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
