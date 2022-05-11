import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  static API_URL="http://localhost:8089/user/login";
  actif = {} as any ;

  public pages: any[] = [
    {title: 'Accueil', url: '/home', icon: 'home'},
    {title: 'Compte', url: '/profile', icon: 'person-circle'},
    {title: 'Recharge telephonique', url: '/recharge', icon: 'phone-portrait'},
    {title: 'transfert dargent', url: '/transfert', icon: 'cash'},
    {title: 'paiment marchant', url: '/marchant', icon: 'wallet', },
    {title: 'paiment facture', url: '/facture', icon: 'newspaper',},
    {title: 'Scanner et payement', url: '/scan-pay', icon: 'scan-circle', },
  ];

  constructor( private router : Router) {}

  ngOnInit() {
    this.actif = JSON.parse(localStorage.getItem('user') !== null  ? localStorage.getItem('user')  : '{"first_name" : "","last_name" : "","mail" : ""}');

    console.log('actif', this.actif)

  }
  
  signOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem("user");
  }


}
