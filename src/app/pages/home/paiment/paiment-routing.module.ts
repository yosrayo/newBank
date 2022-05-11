import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaimentPage } from './paiment.page';

const routes: Routes = [
  {
    path: '',
    component: PaimentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaimentPageRoutingModule {}
