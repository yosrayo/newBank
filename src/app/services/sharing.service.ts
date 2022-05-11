import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  dataRegister2: any;
  dataRegister1: any;

  constructor() { }


  sendFromRegister1(data:any)
  {
     return this.dataRegister1=data
  }

  sendFromRegister2(data:any)
  {
     return this.dataRegister2=data
  }

 
}
