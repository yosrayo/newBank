import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaimentPageRoutingModule } from './paiment-routing.module';

import { PaimentPage } from './paiment.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    PaimentPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PaimentPage]
})
export class PaimentPageModule {}
