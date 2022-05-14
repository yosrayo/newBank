import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  segmentValue = '1';
  requests: any[] = [];
  donors: any[] = [];
  lineChart: any;
  newHeight = 0;
  actif = {} as any ;
  u = {} as any;
  id: any;
  sld: any;

  constructor( private userService : UserService) {}

  ngOnInit() {
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user

    this.userService.getUserId(this.id).subscribe((res) => {
      this.u = res;
      console.log("new user " , this.u.solde)
      this.sld=this.u.solde;
      
    });
    console.log('ngOnInit');
   

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
 
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

}
