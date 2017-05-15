import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SqlStorage } from "../../providers/sql-storage";
import { RegPage } from '../reg/reg';
import { FormBuilder, Validators } from "@angular/forms";
import { TabsPage } from '../tabs/tabs';


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
              public navCtrl: NavController,
              private storage: Storage,
              private fb: Facebook,
              public platform: Platform,
              private sqlStorage: SqlStorage,
              public _form: FormBuilder) {
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
    this.sqlStorage.gelAll();
    this.showInfo();
  }

  loginSubmit() {
    console.log(this.registrationForm.value);


  }

  createAccount() {
    this.navCtrl.push(RegPage);

  }

}
