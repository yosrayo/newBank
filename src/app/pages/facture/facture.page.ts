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
import { UserService } from 'src/app/services/user.service';
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
  sld: any;
  code: any;
  u = {} as any;
  constructor( private  router:  Router , 
    private alertController : AlertController , 
    private actionService : ActionService,
    private userService : UserService
    ) { }

  ngOnInit() {
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
  
////////
    this.userService.getUserId(this.id).subscribe((res) => {
      this.u = res;
      console.log("new user " , this.u.solde)
      this.sld=this.u.solde;
      this.code= this.u.conf_code
      
    });

    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;
  }
 


  async valider0() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: 'Pour Confirmer le transfer',
      message:'Vous allez effectuer une facture à '+this.organizationTo+' . Le montant' +this.amount +'DT. Merci d"entrez votre code confidentiel ',
      inputs: [
        {
          name: 'code',
          type: 'password',
          placeholder: 'Entrer votre code confidentiel',

        }



      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log('Confirm Cancel');
          },
        },

        {
          text: 'Confirmer',
          handler: async (inputs: { code: string }) => {
            console.log("soldeeeeee", this.amount)
            if (inputs.code == null || inputs.code==""  || inputs.code !=this.code ) {
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                message: 'Verifier votre code.',
                buttons: ['Cancel']
              });
          
              await alert.present();
            }else if(this.sld< this.amount) {

              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                message: 'solde insuffisant.',
                buttons: ['Cancel']
              });
          
              await alert.present();
            }else  {
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
         
            }
          }
        }


      ],
    });

    await alert.present();

  }

 


}
