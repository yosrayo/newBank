import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./auth/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'recharge',
    loadChildren: () => import('./pages/recharge/recharge.module').then( m => m.RechargePageModule)
  },
  {
    path: 'transfert',
    loadChildren: () => import('./pages/transfert/transfert.module').then( m => m.TransfertPageModule)
  },
  {
    path: 'marchant',
    loadChildren: () => import('./pages/marchant/marchant.module').then( m => m.MarchantPageModule)
  },
  {
    path: 'facture',
    loadChildren: () => import('./pages/facture/facture.module').then( m => m.FacturePageModule)
  },
  {
    path: 'edite-profile',
    loadChildren: () => import('./pages/edite-profile/edite-profile.module').then( m => m.EditeProfilePageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./pages/confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'register2',
    loadChildren: () => import('./auth/register2/register2.module').then( m => m.Register2PageModule)
  },
  {
    path: 'register3',
    loadChildren: () => import('./auth/register3/register3.module').then( m => m.Register3PageModule)
  },
  {
    path: 'detail-transaction',
    loadChildren: () => import('./pages/detail-transaction/detail-transaction.module').then( m => m.DetailTransactionPageModule)
  },
  {
    path: 'scan-pay',
    loadChildren: () => import('./pages/scan-pay/scan-pay.module').then( m => m.ScanPayPageModule)
  },
  {
    path: 'forget-pass',
    loadChildren: () => import('./pages/forget-pass/forget-pass.module').then( m => m.ForgetPassPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
