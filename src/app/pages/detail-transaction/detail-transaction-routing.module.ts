import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailTransactionPage } from './detail-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailTransactionPageRoutingModule {}
