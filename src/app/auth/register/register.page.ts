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
