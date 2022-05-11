import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {
  actif = {} as any ;
  newpass: string;
  username: string;
  u :User[];
  constructor( private userService : UserService , private route : Router) { }

  ngOnInit() {
  
  }


  reset(){

    this.userService.passwordForgettin( this.username , this.newpass)
    .subscribe((res) => {
      this.u= res;
    
        this.route.navigate(['/login']);
        alert("ajouter avec succés");

      },
      err => console.log(err)
    );
  }



}
