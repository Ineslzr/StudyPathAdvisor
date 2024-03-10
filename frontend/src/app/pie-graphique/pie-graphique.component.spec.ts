import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGraphiqueComponent } from './pie-graphique.component';

describe('PieGraphiqueComponent', () => {
  let component: PieGraphiqueComponent;
  let fixture: ComponentFixture<PieGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieGraphiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
