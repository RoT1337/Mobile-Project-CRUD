import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitSelectionPage } from './habit-selection.page';

const routes: Routes = [
  {
    path: '',
    component: HabitSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitSelectionPageRoutingModule {}
