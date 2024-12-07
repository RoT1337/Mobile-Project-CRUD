import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedHabit: any;
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  selectedCategory: string | 'all' |null = null;
  currentWeek: { dayName: string; date: string; isDisabled: boolean }[] = [];
  selectedDay: string = '';

  constructor() {}

  ngOnInit() {
    this.generateCurrentWeek();
    this.highlightToday();
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


  habits: { name: string; frequency: string; goal: number; progress: number; endDate: string; category?: string | null }[] = [];

  filterHabits() {
    if (this.selectedCategory === 'all') {
      return this.habits;
    } else {
      return this.habits.filter(habit => {
        const category = habit.category ?? 'unknown';
        return category === this.selectedCategory;
      });
    }
  }

  enterEditMode() {
    this.isEditMode = true;
  }
  openEditModal(habit: any) {
    this.selectedHabit = habit;
    this.isModalOpen = true;
    this.isEditMode = true;
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

  deleteHabit() {
    this.habits = this.habits.filter((h) => h !== this.selectedHabit);
    this.closeModal();
  }

  saveHabitEdits(name: string, frequency: string, goal: number, endDate: string) {
    this.selectedHabit.name = name || '';
    this.selectedHabit.frequency = frequency || 'daily'; 
    this.selectedHabit.goal = goal || 0;
    this.selectedHabit.endDate = endDate || '';
  
    this.closeModal();
  }
}

//anhi lang sa nako ibutang kay gagubot akong utok sa <form (submit)="saveHabitEdits(name.value, frequency.value, +goal.value, endDate.value)">
//siguro tunggod lang sad wla pa gipangbutang

/*
<ion-modal [isOpen]="isModalOpen" (willDismiss)="closeModal()">
  <ng-container *ngIf="!isEditMode">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ selectedHabit?.name }} Progress</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p>Progress: {{ selectedHabit?.progress }}%</p>
    </ion-content>
  </ng-container>

  <ng-container *ngIf="isEditMode">
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit {{ selectedHabit?.name }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form (submit)="saveHabitEdits(name.value, frequency.value, +goal.value, endDate.value)">

        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input #name [value]="selectedHabit?.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Frequency</ion-label>
          <ion-select #frequency [value]="selectedHabit?.frequency">
            <ion-select-option value="daily">Daily</ion-select-option>
            <ion-select-option value="weekly">Weekly</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Goal</ion-label>
          <ion-input type="number" #goal [value]="selectedHabit?.goal"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">End Date</ion-label>
          <ion-datetime #endDate [value]="selectedHabit?.endDate">
        </ion-item>
        <ion-button expand="block" type="submit">Save</ion-button>
      </form>
    </ion-content>
  </ng-container>
</ion-modal>
*/