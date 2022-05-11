import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  back: boolean;
  form: FormGroup;
  constructor(public router: Router , private alertController : AlertController) { }

  ngOnInit() {
    /// bouton back
    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;
////// formm valid
    this.form = new FormGroup({
  
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
      cout: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(3)]
      }),
      op: new FormControl('',
      { validators: [Validators.required] }
    ),
     
    });
  }
  onSubmit() {
    if (!this.form.valid) return;
    console.log(this.form.value);
  }


  async valider() {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
    
      header: 'Pour Confirmer le transfer',
      message:'Vous allez effectuer une recharge téléphonique d"un montant ****DT vers **** <br>. Merci d"entrez votre code confidentiel',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Entrer votre code confidentiel',
        },
        
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
            console.log('Confirm Ok');
            this.router.navigateByUrl('/confirm')
          },
        },
      ],
    });

    await alert.present();
  }

}
