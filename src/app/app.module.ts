import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { QRCodeModule } from 'angularx-qrcode';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule , 
      HttpClientModule ,
      QRCodeModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()),
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(environment.firebase),
      
      
     

          
 ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner  ],
  bootstrap: [AppComponent],
})
export class AppModule {}