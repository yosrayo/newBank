import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailTransactionPageRoutingModule } from './detail-transaction-routing.module';

import { DetailTransactionPage } from './detail-transaction.page';
import { RowPipe } from 'src/app/row.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTransactionPageRoutingModule
  ],
  declarations: [DetailTransactionPage ]
})
export class DetailTransactionPageModule {}
