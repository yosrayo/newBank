import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPayPageRoutingModule } from './scan-pay-routing.module';

import { ScanPayPage } from './scan-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPayPageRoutingModule
  ],
  declarations: [ScanPayPage]
})
export class ScanPayPageModule {}
