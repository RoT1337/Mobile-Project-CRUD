import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitSelectionPageRoutingModule } from './habit-selection-routing.module';

import { HabitSelectionPage } from './habit-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitSelectionPageRoutingModule
  ],
  declarations: [HabitSelectionPage]
})
export class HabitSelectionPageModule {}
