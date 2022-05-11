import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActionService } from 'src/app/services/action.service';
import { DetailTransactionPage } from '../../detail-transaction/detail-transaction.page';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  segmentValue = '1';
  back: boolean;
  newHeight = 0;
  listAction = [] as any;
  actif = {} as any ;
  id : number;
  constructor(public router: Router ,
     private actionService:ActionService ,
     private route: Router  ,
      public navCtrl: NavController) { }

  ngOnInit() {

    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
    console.log('idAction', this.id)
    //retour page home
    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;
    //get action list
    this.actionService.getActionIdUser(this.id).subscribe((res) => {
      this.listAction = res;
      console.log('actionnnn',this.listAction)
    });
  }
 
  scroll(event) {
    const value = event.detail.scrollTop;
    console.log(value, this.newHeight);
    if(value > 40) {
      this.newHeight += 5; // this.newHeight = this.newHeight + 5
    } else {
      this.newHeight = 0;
    }
    if(value > 180 && this.newHeight <= 65) {
      this.newHeight += 50;
    }
  }

 
  goTo(action) {


    let navigationExtras: NavigationExtras = {
      state: {
        action
      } 
    };
   this.navCtrl.navigateForward(['detail-transaction'], navigationExtras);
   console.log("actionnnn", navigationExtras)
  }

}
