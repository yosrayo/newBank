import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturePageRoutingModule } from './facture-routing.module';

import { FacturePage } from './facture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FacturePage]
})
export class FacturePageModule {}
