import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGpaComponent } from './student-gpa.component';

describe('StudentGpaComponent', () => {
  let component: StudentGpaComponent;
  let fixture: ComponentFixture<StudentGpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGpaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
