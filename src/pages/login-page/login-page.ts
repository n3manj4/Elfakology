import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SqlStorage } from "../../providers/sql-storage";
import { RegPage } from '../reg/reg';
import { FormBuilder, Validators } from "@angular/forms";


export interface User {
  id: string,
  email: string,
  birthday: string,
  access_token: string,
  profile_photo: string,
  name: string,
  friends: any

}

@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  loggedIn: boolean = false;
  canEdit: boolean = false;
  userProfile: User = {
    id: '',
    email: '',
    birthday: '',
    access_token: '',
    profile_photo: '',
    name: '',
    friends: []
  };
  FB_APP_ID: number = 269980626738836;
  isenabled:boolean=true;
   tabBarElement: any;

  public registrationForm:any;

  constructor(private photoViewer: PhotoViewer,
              private toastCtrl: ToastController,
              public navCtrl: NavController,
              private storage: Storage,
              private fb: Facebook,
              public platform: Platform,
              private sqlStorage: SqlStorage,
              public _form: FormBuilder,
              ) {
    this.platform = platform;
    this.registrationForm = this._form.group({
      "username": ['', Validators.required],
      "password": ['', [Validators.required, Validators.minLength(5)]]
    });

  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  doFbLogin(){
    if (this.platform.is('cordova')) {
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
     console.log('Logged into Facebook!', res);
     console.log(JSON.stringify(res));

     this.userProfile.id = res.authResponse.userID;
     this.showInfo();
     this.navCtrl.setRoot(TabsPage);

  }).catch(e => console.log('Error logging into Facebook', e));
} else {
  console.log("Please run me on a device");
  this.isenabled=false;
}
}

  showInfo() {
    //p = new Promise((resolve, reject) => {
    this.fb.api('/' + this.userProfile.id + '?fields = name', []).then((data) => {
      //Get the user data
      this.userProfile.name = data.name;
      console.log(this.userProfile.name);

      //Get the user profile picture and save in user object
      this.fb.api('/' + this.userProfile.id + '/picture?height=300&width=300&redirect=false', []).then((data) => {
        //this.userProfile.profile_photo = data.data.url;
        this.storage.set('user_photo', data);

        console.log(this.userProfile.profile_photo);
        //this.photoViewer.show(this.userProfile.profile_photo);
      });
    });

}
showData() {
    //this.sqlStorage.gelAll();
    //this.showInfo();
    this.sqlStorage.gelAll2().then(data => {
      let i;
      for (i = 0; i < data.res.rows.length; i++) {

        console.log(data.res.rows.item(i));
      }

    });
  }

  loginSubmit() {
    this.userProfile.name = this.registrationForm.value.username;
    this.userProfile.id = this.registrationForm.value.username+this.registrationForm.value.password;
    console.log(this.registrationForm.value);

    this.sqlStorage.gelAll2().then(data => {
      console.log(this.userProfile.id);
      let  i;
      for (i = 0; i < data.res.rows.length; i++) {
        console.log(data.res.rows.item(i).id);

        if(this.userProfile.id == data.res.rows.item(i).id)
        {
          //alert("Email vec postoji.");
          let toast2 = this.toastCtrl.create({
                message: 'Uspesno logovanje ',
                duration: 1500,
                position: 'bottom'
              });
              setTimeout(()=>{this.navCtrl.push(TabsPage,this.userProfile.id);}, 1000);
              toast2.present();
          // checkEmail = false;
          return;
        }
        else if(i+1 == data.res.rows.length )
        {
          let toast1 = this.toastCtrl.create({
                message: 'Pogresan username ili password',
                duration: 3000,
                position: 'bottom'
              });
              toast1.present();
        }
      }
    });
  }





  createAccount() {
    this.navCtrl.push(RegPage);

  }

}
