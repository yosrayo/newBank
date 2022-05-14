import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Action } from 'src/app/classes/action';
import { Facture } from 'src/app/classes/facture';
import { Organisation } from 'src/app/classes/organisation';
import { ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { FactureService } from 'src/app/services/facture.service';
import { AboutPage } from '../about/about.page';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
})
export class FacturePage implements OnInit {
  back: boolean;
  facture: Action = new Action();
  errorMessage: string;
  ionicForm: FormGroup;
  reference:number;
  amount: number;
  actif = {} as any ;
  id : number;
  organizationTo : number;
  constructor( private  router:  Router , 
    private alertController : AlertController , 
    private actionService : ActionService) { }

  ngOnInit() {
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user


    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;
  }
 

  async valid() {
    console.log("rrrrrrrrrr", this.facture)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
    
      header: 'Pour Confirmer la facture',
      message:'Vous allez effectuer une facture à '+this.organizationTo+' . Le montant' +this.amount +'TND. Merci d"entrez votre code confidentiel ',
     
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Confirmer',
          handler: () => {
           //this.facture.organizationTo= Number(this.organizationTo)
            this.facture.action_type="Paiement_FACTURE";
            this.facture.amount=Number(this.amount);
            this.facture.payed=1;
            this.actionService.payFacture( this.id,this.reference,this.facture)
            .subscribe(
              res => {
                this.router.navigateByUrl('/confirm')
              },
              err => console.log(err)
            );
         
          },
        },
      ],
    });

    await alert.present();
  }


 


}
