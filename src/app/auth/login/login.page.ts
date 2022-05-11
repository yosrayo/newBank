import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupForm: FormGroup;

  user: User = new User();
  errorMessage: string;

  u :User[];

  h: any;
  b=false;

  pwd: string;
  username:string;
  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit() {

  
  }


  login() {
    this.userService.getUser(this.username, this.pwd).subscribe((res) => {
      this.u = res;
      console.log("usr",this.u)

      if(this.u.length!==0){
        this.router.navigate(['/home']);
        localStorage.setItem("user",JSON.stringify(this.u));
      }else{
        alert("mot de passe incorrecte")
      }
    });
  }
  
}
