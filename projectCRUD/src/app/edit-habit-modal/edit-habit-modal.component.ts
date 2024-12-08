import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-habit-modal',
  templateUrl: './edit-habit-modal.component.html',
  styleUrls: ['./edit-habit-modal.component.scss'],
})
export class EditHabitModalComponent implements OnInit {
  @Input() habit: any;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveHabitEdits() {
    const { name, description, category, dateTime, progress } = this.habit;
    const [date, time] = dateTime.split('T');

    if (!name || !category || !date || !time || progress === undefined) {
      console.error('All fields are required');
      return;
    }

    const updatedHabit = {
      name,
      description,
      category,
      date,
      time,
      progress
    };

    console.log('Updated Habit:', updatedHabit);

    this.authService.updateHabit(updatedHabit).subscribe({
      next: () => {
        this.modalController.dismiss(updatedHabit);
      },
      error: (error) => {
        console.error('Error updating habit:', error);
      }
    });
  }
}