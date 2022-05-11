import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargePageRoutingModule } from './recharge-routing.module';

import { RechargePage } from './recharge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechargePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RechargePage]
})
export class RechargePageModule {}
