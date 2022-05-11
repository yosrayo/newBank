import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/classes/action';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.page.html',
  styleUrls: ['./detail-transaction.page.scss'],
})
export class DetailTransactionPage implements OnInit {
  actionList = [] as any;
  act;
  back: boolean;
  constructor(public router: Router, private route: ActivatedRoute) {
    let action = this.router.getCurrentNavigation().extras.state;
    console.log("yosraaaa", action);
    this.act = action;
    console.log('act', this.act);

    this.actionList.push(action);
    console.log(this.actionList);
  


  }

  ngOnInit() {
    this.actionList = history.state.someData;
    const data = this.router.url.split('/');
    console.log(data);
    if (data[1] == 'home') this.back = true;
    else this.back = false;
  }



}
