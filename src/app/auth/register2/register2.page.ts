import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {
  user: User = new User();
  signupForm: FormGroup;
  isTypePassword: boolean = true;
  data = [] as any;
  data2 = [] as any;
  constructor(private route: Router ,
    private router: ActivatedRoute,
     private userService : UserService ,
     public navCtrl: NavController,
     public share : SharingService
     ) {
    //reçoi data from register etape 1 
 
   }


  ngOnInit() {
    this.data = history.state.someData;


    
  }


  registerUser() {
 
    this.userService.create(this.data2)
    .subscribe(
      res => {
       // this.route.navigate(['/register3']);
        alert("ajouter avec succés");
      },
      err => console.log(err)
    );

    
    
  }


  goTo(user : User ) {
    let navigationExtras: NavigationExtras = {
      state: {
       user
      } ,
     
    };
   this.navCtrl.navigateForward(['register3'], navigationExtras);
  }


  goToo(user)
  {    this.share.sendFromRegister2(user)
    this.route.navigate(['/register3']);
  }
  
}
