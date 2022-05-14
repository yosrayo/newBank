import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Action } from 'src/app/classes/action';
import { ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-marchant',
  templateUrl: './marchant.page.html',
  styleUrls: ['./marchant.page.scss'],
})
export class MarchantPage implements OnInit {
  back: boolean;
  action: Action = new Action();
  errorMessage: string;
  ionicForm: FormGroup;
  
  actif = {} as any ;
  id : number;

  id_paiement : number;
  amount : number;
  solde: any;
  sld: any;
  code: any;
  u = {} as any;
  
  constructor(private  router:  Router ,
     private alertController : AlertController , 
    private actionService : ActionService ,
    private userService :UserService ) { }

  ngOnInit() {
    //get actif user
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
    this.code = this.actif.conf_code

//get solde
    this.userService.getUserId(this.id).subscribe((res) => {
      this.u = res;
      console.log("new user " , this.u.solde)
      this.sld=this.u.solde;
      
    });

    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;
  }
  submit(form){
   
  }


 


  
  async valider() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: 'Pour Confirmer le transfer',
      message: 'Vous allez effectuer un montant ' + this.amount + 'DT vers' + this.id_paiement + '<br>. Merci d"entrez votre code confidentiel',
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
              this.action.action_type="Paiement_MARCHAND";
              this.action.amount=this.amount;
            this.actionService.add(this.id,this.id_paiement,this.action)
              .subscribe(
                res => {
                  this.router.navigateByUrl('/confirm')
                },
                err => console.log(err)
              );
        
              this.router.navigateByUrl('/confirm')
            }
          }
        }


      ],
    });

    await alert.present();

  }

}
