import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Register3PageRoutingModule } from './register3-routing.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { Register3Page } from './register3.page';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Register3PageRoutingModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ],
  declarations: [Register3Page , OtpComponent]
})
export class Register3PageModule {}
