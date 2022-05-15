import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraPermissionType, CameraResultType, CameraSource, ImageOptions } from "@capacitor/camera";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-edite-profile',
  templateUrl: './edite-profile.page.html',
  styleUrls: ['./edite-profile.page.scss'],
})
export class EditeProfilePage implements OnInit {
  photo = "";
  back: boolean;
  base64: string = "";
  //u: User() new ;
  user: User = new User();
  actif = {} as any ;
  id : number;
  listCity=[ "Tunis",
    "Le_Bardo",
    "Le_Kram",
    "La_Goulette",
    "Carthage",
    "Sidi_Bou_Said",
    "La_Marsa",
    "Sidi_Hassine",
    "Ariana",
    "La_Soukra",
    "Raoued",
    "Kalaat_el_Andalous",
    "Sidi_Thabet",
    "Ettadhamen_Mnihla",
    "Ben_Arous",
    "El_Mourouj",
    "Hammam_Lif",
    "Hammam_Chott",
    "Bou_Mhel_el_Bassatine",
    "Ezzahra",
    "Rades",
    "Megrine",]
    
  currentUser: any;
  ngForm:FormGroup;

  fb = '';
  downloadURL: Observable<string>;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public router: Router,
    public userService: UserService ,
    private storage: AngularFireStorage,
    private httpClient: HttpClient,
    
  ) { }



  ngOnInit() {
    this.actif = JSON.parse(localStorage.getItem('user'));
    this.id = this.actif.id_user
    console.log("ddddddd", this.id)
    //back to home
    const data = this.router.url.split('/');
    console.log(data);
    if (data[1] == 'home') this.back = true;
    else this.back = false;

    //camera
    Camera.requestPermissions({ permissions: ['photos'] })
    console.log("jjjjj", this.base64)
    this.currentUser= JSON.parse(localStorage.getItem('user') !== null  ? localStorage.getItem('user')  : '{"first_name" : "","last_name" : "","mail" : ""}');
    console.log("current user", this.currentUser)
    this.validators()



  }

validators()
{
  this.ngForm = new FormGroup({
    first_name: new FormControl(this.currentUser.first_name, Validators.required), 
    last_name: new FormControl(this.currentUser.last_name, Validators.required), 
    city: new FormControl(this.currentUser.city, Validators.required),   
    phone: new FormControl(this.currentUser.phone, Validators.required), 
    mail: new FormControl(this.currentUser.mail, Validators.required), 
    pwd:new FormControl('', Validators.required), 
    address:new FormControl(this.currentUser.address, Validators.required), 
    photo:new FormControl('', Validators.required), 
    id_user: new FormControl(this.currentUser.id_user,),
    username: new FormControl(this.currentUser.username,),
    conf_code: new FormControl(this.currentUser.conf_code,),
    work_type: new FormControl(this.currentUser.work_type,),
    account_type: new FormControl(this.currentUser.account_type,),
    id_paiement: new FormControl(this.currentUser.id_paiement,),
    birth_date: new FormControl(this.currentUser.birth_date,),
    bank: new FormControl(this.currentUser.bank,),
    governorate: new FormControl(this.currentUser.governorate,),
    solde: new FormControl(this.currentUser.solde,),
    verified: new FormControl(this.currentUser.verified,),




  });
  
  console.log("form to update",this.ngForm.value)
}

 





  update() {
   // console.log("current user to update",currentUserId)
    console.log("form  user to update",this.ngForm.value)
     this.userService.update(this.ngForm.value)
      .subscribe((res) => {
        this.router.navigate(['/home']);
     console.log("current user after  update",this.ngForm.value)
     localStorage.setItem("user",JSON.stringify(this.ngForm.value));
     alert("update avec succés");


      },
        err => console.log(err)
      );  
  }



  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {

              this.fb = url;
              this.ngForm.controls['photo'].setValue(this.fb);          }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
    

}