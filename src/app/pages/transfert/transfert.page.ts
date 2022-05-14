import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Action } from 'src/app/classes/action';
import { ActionService } from 'src/app/services/action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {
  back: boolean;
  amount: number;
  idPaiement: number;
  montant: Action = new Action();
  actif = {} as any;
  id: number;
  sld: number;
  code: any;
  u = {} as any;
  constructor(public router: Router,
    private alertController: AlertController,
    private actionService: ActionService,
    private alertCtrl: AlertController ,
    private userService : UserService

  ) { }

  ngOnInit() {
    //get current user from storage
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
    this.code = this.actif.conf_code
    // get solde 
    
    this.userService.getUserId(this.id).subscribe((res) => {
      this.u = res;
      console.log("new user " , this.u.solde)
      this.sld=this.u.solde;
      
    });

    const data = this.router.url.split('/');
    console.log(data);
    if (data[1] == 'home') this.back = true;
    else this.back = false;
  }
  

  async valider() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: 'Pour Confirmer le transfer',
      message: 'Vous allez effectuer un montant ' + this.amount + 'DT vers' + this.idPaiement + '<br>. Merci d"entrez votre code confidentiel',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Entrer votre code confidentiel',

        }



      ],
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
            console.log("tttttttttt", this.montant)

            if (this.amount > this.sld) {
              console.log("hfhhfhhh")

            } else {
              this.montant.action_type = "Virement_BANCAIRE"
              this.actionService.sendMoney(this.id, this.idPaiement, this.montant)
                .subscribe(
                  res => {
                    this.router.navigateByUrl('/confirm')
                  },
                  err => console.log(err)
                );

            }
          },

        },
      ],
    });

    await alert.present();

  }




  async valider0() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: 'Pour Confirmer le transfer',
      message: 'Vous allez effectuer un montant ' + this.amount + 'DT vers' + this.idPaiement + '<br>. Merci d"entrez votre code confidentiel',
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
              this.montant.action_type = "Virement_BANCAIRE"
              this.actionService.sendMoney(this.id, this.idPaiement, this.montant)
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
