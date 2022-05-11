import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Auth, RecaptchaVerifier } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  @Input() phone;
  isLoading = false;
  otp: string;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style'
  };
  appVerifier: RecaptchaVerifier;
  data = [] as any;
  data2 = [] as any;
  dataRegister1: any;
  dataRegister2: any;
  finalData: any;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private auth: AuthService,
    private _fireAuth: Auth,
    private userService: UserService,
    private route: Router,
    public share: SharingService
  ) {



  }

  ngOnInit() {
    this.dataRegister1 = this.share.dataRegister1
    this.dataRegister2 = this.share.dataRegister2
    console.log("data 1", this.dataRegister1)
    console.log("data 2", this.dataRegister2)
    this.route.navigate(['/','login']);


    this.finalData = Object.assign(this.dataRegister1, this.dataRegister2)
    console.log("final data", this.finalData)
    this.data = history.state.someData;
  }


  async ionViewDidEnter() {

    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      },
      'expired-callback': () => { }
    }, this._fireAuth);

  }


  async ionViewDidLoad() {

    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      },
      'expired-callback': () => { }
    }, this._fireAuth);

  }


  showLoader(msg) {
    if (!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
      .catch(e => {
        this.isLoading = false;
        console.log(e);
      })
  }

  hideLoader() {
    if (this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
      .then(() => console.log('dismissed'))
      .catch(e => console.log(e));
  }

  onOtpChange(event) {
    this.otp = event;
    console.log(this.otp);
  }

  async resend() {
    try {
      const response = await this.auth.signInWithPhoneNumber('+216' + this.phone, this.appVerifier);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async verifyOtp() {
    try {
      const response = await this.auth.verifyOtp(this.otp).then(() => {
        this.finalData["verified"] = 1;
        console.log("final data", this.finalData)
        this.userService.create(this.finalData)
          .subscribe(
            res => {

              this.route.navigateByUrl('/home');
              location.reload()
            },
            err => console.log(err)
          );

      });

    } catch (e) {
      console.log(e);
    }



  }
}
