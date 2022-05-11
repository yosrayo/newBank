import { ModalController, ModalOptions } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';

@Component({
  selector: 'app-register3',
  templateUrl: './register3.page.html',
  styleUrls: ['./register3.page.scss'],
})
export class Register3Page implements OnInit {
  form: FormGroup;
  appVerifier: RecaptchaVerifier;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private _fireAuth: Auth
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
      }),
    });
  }

  async ionViewDidEnter()
{
  
    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      },
      'expired-callback': () => {}
    }, this._fireAuth);
  
}


async ionViewDidLoad()
{
  
    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      },
      'expired-callback': () => {}
    }, this._fireAuth);
  
}

  async signIn() {
    try {
      if(!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }
      console.log(this.form.value);

      const response = await this.auth.signInWithPhoneNumber('+216' + this.form.value.phone,this.appVerifier);
      console.log(response);

      const options: ModalOptions = {
        component: OtpComponent,
        componentProps: {
          phone: this.form.value.phone
        },
        swipeToClose: true
      };
      const modal = this.modalCtrl.create(options);
      (await modal).present();
      const data: any = (await modal).onWillDismiss();
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }


 


}
