import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphiqueComponent } from './line-graphique.component';

describe('LineGraphiqueComponent', () => {
  let component: LineGraphiqueComponent;
  let fixture: ComponentFixture<LineGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
