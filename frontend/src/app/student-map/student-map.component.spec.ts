import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMapComponent } from './student-map.component';

describe('StudentMapComponent', () => {
  let component: StudentMapComponent;
  let fixture: ComponentFixture<StudentMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
