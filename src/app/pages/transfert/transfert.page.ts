import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Action } from 'src/app/classes/action';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {
  back: boolean;
  amount: number;
  idPaiement:number;
  montant: Action = new Action();
  actif = {} as any ;
  id : number;
  sld : number;
  constructor(public router: Router ,
     private alertController : AlertController,
     private actionService : ActionService
     ) { }

  ngOnInit() {
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
    this.sld = this.actif.solde
    console.log("solde", this.sld)

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
    
      header: 'Pour Confirmer le transfert',
      message:'Vous allez effectuer un montant '+this.amount +'TND vers' + this.idPaiement + '.<br>Merci d"entrez votre code confidentiel',
     
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
        
            if (this.amount> this.sld){
              console.log("hfhhfhhh")

            }else{
              this.montant.action_type= "Virement_BANCAIRE"
            this.actionService.sendMoney( this.id,this.idPaiement,this.montant)
            .subscribe(
              res => {
                this.router.navigateByUrl('/confirm')
              },
              err => console.log(err)
            );
           } },
        
        },
      ],
    });
  
    await alert.present();
  
  }
}
