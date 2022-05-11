import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  isTypePassword: boolean = true;
  user: User = new User();
  listCity=[ "Tunis",
  "Le_Bardo",
  "Le_Kram",
  "La_Goulette",
  "Carthage",
  "Sidi_Bou_Said",
  "La_Marsa",
  "Sidi_Hassine",
  "Ariana",
  "La_Soukra",
  "Raoued",
  "Kalaat_el_Andalous",
  "Sidi_Thabet",
  "Ettadhamen_Mnihla",
  "Ben_Arous",
  "El_Mourouj",
  "Hammam_Lif",
  "Hammam_Chott",
  "Bou_Mhel_el_Bassatine",
  "Ezzahra",
  "Rades",
  "Megrine",]
  constructor(private userService: UserService, 
    private route: Router ,
    public navCtrl: NavController,
    public share:SharingService) {
  
  }

  ngOnInit() { }
 /// send data to register2
  x(){
    let navigationExtras: NavigationExtras = {
      state: {
        id: JSON.stringify(this.user)
      }
    };
    this.route.navigate(['register2'], navigationExtras);
    console.log("hhhhhhhh",this.user)

  }

  
  goTo(user) {
    let navigationExtras: NavigationExtras = {
      state: {
       user
      } 
    };
   this.navCtrl.navigateForward(['register2'], navigationExtras);
  }

  goToo(user)
{
  console.log("tefzqydfuyqzgf", user)
  this.share.sendFromRegister1(user)
 this.route.navigate(['/register2']);
}



  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }




  



}
