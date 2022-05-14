import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import jsQR from "jsqr";
import { Action } from 'src/app/classes/action';
import { ActionService } from 'src/app/services/action.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-scan-pay',
  templateUrl: './scan-pay.page.html',
  styleUrls: ['./scan-pay.page.scss'],
})
export class ScanPayPage implements OnInit {
  scanActive = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  videoElement: any;
  loading: HTMLIonLoadingElement;
  canvasElement: any;
  canvasContext: any;
  back: boolean;

  actif = {} as any ;
  id : number;

  reference:number;
  amount: number;
  organizationTo : number;
  sld: any;
  code: any;
  u = {} as any;

  action: Action = new Action();
  
  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public router: Router,
    private alertController : AlertController , 
    private actionService : ActionService,
    private userService: UserService
    ) { }

  ngOnInit(): void {

    this.userService.getUserId(this.id).subscribe((res) => {
      this.u = res;
      console.log("new user " , this.u.solde)
      this.sld=this.u.solde;
      
    });


    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
    ///back to home page
    const data = this.router.url.split('/');
    console.log(data);
    if (data[1] == 'home') this.back = true;
    else this.back = false;

  }
  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    this.loading= await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));

  }

  async scan() {
    console.log("scan")
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
      
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      console.log('code', code);

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }

    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }


  stopScan() {
    this.scanActive = false;
  }
  reset() {
    this.scanResult = null;
  }

  
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: 'Open ${this.scanResult}?',
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'lacation=yes');
          }
        }
      ]
    });
    toast.present();
  }


 
  async valider() {
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
              this.action.action_type="Paiement_FACTURE";
            this.action.amount=Number(this.amount);
            this.action.payed=1;
            this.actionService.payFacture( this.id,this.reference,this.action)
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
