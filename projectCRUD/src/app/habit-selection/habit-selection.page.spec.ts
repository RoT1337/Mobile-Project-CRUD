import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitSelectionPage } from './habit-selection.page';

describe('HabitSelectionPage', () => {
  let component: HabitSelectionPage;
  let fixture: ComponentFixture<HabitSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
