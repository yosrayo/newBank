import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'profile',
    loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'paiment',
    loadChildren: () => import('./paiment/paiment.module').then( m => m.PaimentPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
