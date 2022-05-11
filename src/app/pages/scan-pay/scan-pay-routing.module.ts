import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanPayPage } from './scan-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanPayPageRoutingModule {}
