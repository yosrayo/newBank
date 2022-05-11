import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  back: boolean;
  actif = {} as any ;
  constructor(public router: Router) { }

  ngOnInit() {

    this.actif = JSON.parse(localStorage.getItem('user'));
    console.log('hjjjjjbjhbuhybnuyhnui',this.actif)

    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home') this.back = true;
    else this.back = false;
  }

}
