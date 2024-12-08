import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EditHabitModalComponent } from '../edit-habit-modal/edit-habit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedHabit: any;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedCategory: string | 'all' | null = null;
  currentWeek: { dayName: string; date: string; isDisabled: boolean }[] = [];
  selectedDay: string = '';
  habits: { name: string; description?: string; category: string; date: string; time: string; progress: number }[] = [];
  filteredHabits: { name: string; description?: string; category: string; date: string; time: string; progress: number }[] = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.generateCurrentWeek();
    this.highlightToday();
  }

  ionViewWillEnter() {
    this.loadHabits();
  }

  generateCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);

      const dayString = currentDay.getDate().toString().padStart(2, '0');

      const isDisabled = currentDay < today;

      this.currentWeek.push({
        dayName: currentDay.toLocaleString('default', { weekday: 'short' }),
        date: dayString,
        isDisabled,
      });
    }
  }

  highlightToday() {
    const today = new Date();
    this.selectedDay = today.getDate().toString().padStart(2, '0');
  }

  loadHabits() {
    this.authService.getAllHabits().subscribe(habits => {
      this.habits = habits;
      this.filterHabits(); // Filter habits after loading
    });
  }

  filterHabits() {
    if (this.selectedCategory === 'all') {
      this.filteredHabits = this.habits;
    } else {
      this.filteredHabits = this.habits.filter(habit => habit.category === this.selectedCategory);
    }
  }

  async openEditModal(habit: any) {
    // Ensure dateTime is correctly set
    habit.dateTime = `${habit.date}T${habit.time}`;

    const modal = await this.modalController.create({
      component: EditHabitModalComponent,
      componentProps: { habit }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const updatedHabit = result.data;
        const index = this.habits.findIndex(h => h.name === updatedHabit.name);
        if (index !== -1) {
          this.habits[index] = updatedHabit;
          this.filterHabits(); // Filter habits after updating
        }
      }
    });

    return await modal.present();
  }

  selectHabit(habit: { endDate?: string }) {
    this.selectedHabit = habit;
  }

  openProgressModal(habit: any) {
    this.selectedHabit = habit;
    this.isModalOpen = true;
    this.isEditMode = false;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedHabit = null;
  }

  async confirmDeleteHabit(name: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this habit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteHabit(name);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteHabit(name: string) {
    this.authService.deleteHabit(name).subscribe(() => {
      this.habits = this.habits.filter(h => h.name !== name);
      this.filterHabits(); // Filter habits after deleting
    });
  }

  onProfileClick() {
    this.navCtrl.navigateForward('/profile');
  }

  onSettingsClick() {
    this.navCtrl.navigateForward('/settings');
  }

  onNotificationsClick() {
    this.navCtrl.navigateForward('/notifications');
  }

  onLogOutClick() {
    this.navCtrl.navigateRoot('/login');
  }

  onAddClick() {
    this.navCtrl.navigateForward('/habit-selection');
  }
}