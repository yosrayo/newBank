import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { QRCodeModule } from 'angularx-qrcode';
import { RowPipe } from './row.pipe';
import { NgOtpInputModule } from  'ng-otp-input';


import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from "@angular/fire/compat";



import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  //StorageBucket
} from "@angular/fire/compat/storage";
@NgModule({
  declarations: [AppComponent, RowPipe],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule , 
      HttpClientModule ,
      QRCodeModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()),
      AngularFireDatabaseModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireModule.initializeApp(environment.firebase, "cloud")

     
      
          
 ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner , RowPipe ,NgOtpInputModule ],
  bootstrap: [AppComponent],
})
export class AppModule {}
