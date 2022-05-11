import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditeProfilePage } from './edite-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditeProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditeProfilePageRoutingModule {}
