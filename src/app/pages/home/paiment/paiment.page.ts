import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Clipboard , WriteOptions} from "@capacitor/clipboard";
import { ToastController } from '@ionic/angular';
 

@Component({
  selector: 'app-paiment',
  templateUrl: './paiment.page.html',
  styleUrls: ['./paiment.page.scss'],
})
export class PaimentPage implements OnInit {
  public textToCode: string;
  public myAngularxQrCode: string = null;
  back: boolean;
  form: FormGroup;
  text:string ="click"
  
  actif = {} as any ;
  constructor(public router: Router , private toastCtrl: ToastController) { 
    this.actif=JSON.parse(localStorage.getItem('user'));
    console.log("hfdffqcqtsvf",this.actif.id_paiement)
    this.textToCode=String(this.actif.id_paiement)
  }

  ngOnInit() {
  
    ///back to home page
    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;

this.createQRCode();
  }


  createQRCode() {
    this.myAngularxQrCode = this.textToCode;
   
  }
 
reset(){
  this.textToCode="";
  this.myAngularxQrCode="";
}

copy(){
  var options : WriteOptions ={
    string:this.text
  }
  Clipboard.write(options).then(async ()=>{
    const toast = await this.toastCtrl.create({
      message: 'Text copié',
      duration: 3000,
      position: 'top'
    
    });
  
  
    toast.present();

  });
}
}
