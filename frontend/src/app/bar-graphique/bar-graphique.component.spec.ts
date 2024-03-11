import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphiqueComponent } from './bar-graphique.component';

describe('BarGraphiqueComponent', () => {
  let component: BarGraphiqueComponent;
  let fixture: ComponentFixture<BarGraphiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarGraphiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarGraphiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
