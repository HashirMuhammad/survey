import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivenSurveyComponent } from './given-survey.component';

describe('GivenSurveyComponent', () => {
  let component: GivenSurveyComponent;
  let fixture: ComponentFixture<GivenSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GivenSurveyComponent]
    });
    fixture = TestBed.createComponent(GivenSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
