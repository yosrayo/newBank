import { Injectable } from '@angular/core';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  appVerifier: any;
  confirmationResult: any;

  constructor(
    private _fireAuth: Auth
  ) { }


  async signInWithPhoneNumber(phoneNumber,verifRecap) {
    try {
      //if(!this.appVerifier) this.recaptcha();
      const confirmationResult = await signInWithPhoneNumber(this._fireAuth, phoneNumber, verifRecap);
      this.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch(e) {
      throw(e);
    }
  }

  async verifyOtp(otp) {
    try {
      //if(!this.appVerifier) this.recaptcha();
      const result = await this.confirmationResult.confirm(otp);
      console.log(result);
      const user = result?.user;
      console.log(user);
    } catch(e) {
      throw(e?.message);
    }
  }
}
