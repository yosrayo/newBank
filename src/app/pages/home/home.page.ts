import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

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

  constructor() {}

  ngOnInit() {
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
