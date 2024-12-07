import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habit-selection',
  templateUrl: './habit-selection.page.html',
  styleUrls: ['./habit-selection.page.scss'],
})
export class HabitSelectionPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  selectHabit(habit: string) {
    console.log(`${habit} habit selected`);
  }
}
