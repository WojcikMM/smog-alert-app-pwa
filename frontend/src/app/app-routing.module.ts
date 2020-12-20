import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainViewComponent} from './views/main-view/main-view.component';
import {SettingsViewComponent} from './views/settings-view/settings-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainViewComponent
  },
  {
    path: 'settings',
    component: SettingsViewComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
