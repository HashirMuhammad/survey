import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFormComponent } from './public-form.component';

describe('PublicFormComponent', () => {
  let component: PublicFormComponent;
  let fixture: ComponentFixture<PublicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicFormComponent]
    });
    fixture = TestBed.createComponent(PublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
