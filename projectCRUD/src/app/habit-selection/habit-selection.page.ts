import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Import the service

@Component({
  selector: 'app-habit-selection',
  templateUrl: './habit-selection.page.html',
  styleUrls: ['./habit-selection.page.scss'],
})
export class HabitSelectionPage implements OnInit {
  habit = {
    name: '',
    description: '',
    category: '',
    dateTime: '',
    progress: 0 // Initialize progress to 0
  };

  constructor(
    private modalController: ModalController,
    private authService: AuthService, // Inject the service
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit() {}

  selectHabit(habit: string) {
    console.log(`${habit} habit selected`);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Missing Fields',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  addHabit() {
    const { name, category, dateTime } = this.habit;

    if (!name || !category || !dateTime) {
      let message = 'The following fields are required:';
      if (!name) message += ' Habit Name ';
      if (!category) message += ' Habit Category ';
      if (!dateTime) message += ' Habit Date & Time ';
      this.presentAlert(message);
      return;
    }

    const [date, time] = dateTime.split('T');
    const habitData = {
      ...this.habit,
      date,
      time,
      progress: 0 // Set progress to 0 when creating a new habit
    };

    this.authService.addHabit(habitData).subscribe(response => {
      console.log('Habit added:', response);
      // Optionally, reset the form or provide feedback to the user
      this.habit = {
        name: '',
        description: '',
        category: '',
        dateTime: '',
        progress: 0
      };
    });
  }
}