import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivenFinalSurveyComponent } from './given-final-survey.component';

describe('GivenFinalSurveyComponent', () => {
  let component: GivenFinalSurveyComponent;
  let fixture: ComponentFixture<GivenFinalSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GivenFinalSurveyComponent]
    });
    fixture = TestBed.createComponent(GivenFinalSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
