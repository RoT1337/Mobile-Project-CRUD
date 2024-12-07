import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isCalendarVisible: boolean = false;
  isEditMode: boolean = false;

  constructor() {}

  toggleCalendar() {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  enterEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      console.log('Edit mode activated');
    } else {
      console.log('Edit mode deactivated');
    }
  }

  editHabit(habit: string) {
    if (this.isEditMode) {
      console.log(`Edit or delete habit: ${habit}`);
    } else {
      console.log(`View details for habit: ${habit}`);
      
    }
  }
}
